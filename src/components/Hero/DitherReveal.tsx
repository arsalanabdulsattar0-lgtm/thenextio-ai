import { useEffect, useRef } from 'react'

interface DitherRevealProps {
  image?: { src: string; alt?: string }
  fit?: 'cover' | 'contain'
  focusY?: number
  ditherStyle?: 'bayer8' | 'lines' | 'noise'
  dotSize?: number
  revealRadius?: number
  revealSoftness?: number
  wave?: boolean
  waveSpeed?: number
  waveDensity?: number
  className?: string
  style?: React.CSSProperties
}

const ditherStylesMap = { bayer8: 0, lines: 1, noise: 2 }

const VERTEX_SHADER = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
    vUv = aPos * 0.5 + 0.5;
    gl_Position = vec4(aPos, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseActive;
uniform float uRevealRadius;
uniform float uRevealSoftness;
uniform float uPixelSize;
uniform float uDitherStyle;

uniform float uWaveSpeed;
uniform float uWaveFrequency;
uniform float uWaveAmplitude;
uniform float uWaveMargin;

uniform float uCanvasAspect;
uniform float uImageAspect;
uniform vec2 uResolution;
uniform float uFit;
uniform float uFocusY;

varying vec2 vUv;

float Bayer2(vec2 a) {
    a = floor(a);
    return fract(a.x * 0.5 + a.y * a.y * 0.75);
}
float Bayer4(vec2 a) { return Bayer2(a * 0.5) * 0.25 + Bayer2(a); }
float Bayer8(vec2 a) { return Bayer4(a * 0.5) * 0.25 + Bayer2(a); }

float ign(vec2 p) {
    return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y));
}

float ordered3(float gray, float thr) {
    float adj = gray + (thr - 0.5) * 0.5;
    return adj < 0.33 ? 0.0 : (adj < 0.66 ? 0.5 : 1.0);
}

float ditherTone(float gray, float ps) {
    vec2 fc = gl_FragCoord.xy / ps;
    if (uDitherStyle < 0.5) {
        return ordered3(gray, Bayer8(fc));
    } else if (uDitherStyle < 1.5) {
        float period = ps * 4.0;
        float v = fract((gl_FragCoord.x + gl_FragCoord.y) / period);
        return 1.0 - step(v, 1.0 - gray);
    }
    return step(ign(fc), gray);
}

vec2 fitUv(vec2 uv) {
    vec2 cover = uCanvasAspect < uImageAspect
        ? vec2(uCanvasAspect / uImageAspect, 1.0)
        : vec2(1.0, uImageAspect / uCanvasAspect);
    vec2 s = uFit > 0.5 ? 1.0 / cover : cover / (1.0 + 2.0 * uWaveMargin);
    vec2 out_ = (uv - 0.5) * s + 0.5;
    out_.y += (1.0 - s.y) * (0.5 - uFocusY) * step(s.y, 1.0);
    return out_;
}

void main() {
    vec2 uv = vUv;
    float time = uTime;
    float waveStrength = uWaveAmplitude * 0.1;
    float revealNorm = uRevealRadius / max(min(uResolution.x, uResolution.y), 1.0);

    float wave1 = sin(uv.y * uWaveFrequency + time * uWaveSpeed) * waveStrength;
    float wave2 = sin(uv.x * uWaveFrequency * 0.7 + time * uWaveSpeed * 0.8) * waveStrength * 0.5;

    vec2 distortedUv = uv;
    distortedUv.x += wave1;
    distortedUv.y += wave2;

    if (uMouseActive > 0.01) {
        float dist = distance(uv, uMouse);
        float mouseInfluence = smoothstep(revealNorm, 0.0, dist);
        float ripple = sin(dist * uWaveFrequency * 5.0 - time * uWaveSpeed)
            * uWaveAmplitude * 0.05 * mouseInfluence * uMouseActive;
        distortedUv.x += ripple;
        distortedUv.y += ripple;
    }

    vec2 sampleUv = fitUv(distortedUv);
    vec4 color = texture2D(uTexture, sampleUv);
    vec2 inside = step(vec2(0.0), sampleUv) * step(sampleUv, vec2(1.0));
    color *= inside.x * inside.y;

    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    float ps = max(uPixelSize, 0.25);
    float tone = ditherTone(gray, ps);
    
    // OriginKit Hero-40 iconic purple palette
    vec3 ditherDark = vec3(0.29, 0.11, 0.53);
    vec3 ditherLight = vec3(0.74, 0.58, 0.94);
    vec3 ditherColor = mix(ditherDark, ditherLight, tone);

    float revealDist = distance(uv * uResolution, uMouse * uResolution);
    float innerRadius = max(0.0, uRevealRadius * (1.0 - uRevealSoftness));
    float outerRadius = uRevealRadius * (1.0 + uRevealSoftness) + 0.001;
    float revealAmount = (1.0 - smoothstep(innerRadius, outerRadius, revealDist)) * uMouseActive;

    // Remove the source image's white studio background, keep the resting
    // hand purple, and reveal the untouched source colour under the pointer.
    float subjectAlpha = smoothstep(0.035, 0.16, 1.0 - gray) * color.a;
    float finalAlpha = mix(subjectAlpha * 0.92, subjectAlpha, revealAmount);
    gl_FragColor = vec4(mix(ditherColor, color.rgb, revealAmount), finalAlpha);
}
`

function clamp(val: number | undefined, min: number, max: number, fallback: number): number {
  if (val === undefined || Number.isNaN(val)) return fallback
  return Math.min(max, Math.max(min, val))
}

export default function DitherReveal({
  image = { src: '/white-hands.png' },
  fit = 'cover',
  focusY = 50,
  ditherStyle = 'bayer8',
  dotSize = 5.5,
  revealRadius = 140,
  revealSoftness = 45,
  wave = true,
  waveSpeed = 45,
  waveDensity = 22,
  className = '',
  style,
}: DitherRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isVisibleRef = useRef(true)

  const imageSrc = image?.src || '/white-hands.png'

  const waveSpd = wave ? clamp(waveSpeed, 1, 100, 45) / 100 : 0
  const config = {
    fit: fit === 'contain' ? 1.0 : 0.0,
    focusY: clamp(focusY, 0, 100, 50) / 100,
    ditherStyle: ditherStylesMap[ditherStyle] ?? 0,
    pixelSize: clamp(dotSize, 1, 20, 5.5) / 2,
    revealRadius: clamp(revealRadius, 20, 600, 140),
    revealSoftness: clamp(revealSoftness, 0, 100, 45) / 100,
    waveSpeed: waveSpd,
    waveFrequency: clamp(waveDensity, 5, 100, 22) / 10,
    waveAmplitude: waveSpd * 0.4,
    waveMargin: waveSpd * 0.4 * 0.15,
  }

  const configRef = useRef(config)
  configRef.current = config

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const gl = canvas.getContext('webgl', {
      antialias: false,
      premultipliedAlpha: false,
      alpha: true,
    })
    if (!gl) return

    function compileShader(type: number, source: string) {
      const shader = gl!.createShader(type)!
      gl!.shaderSource(shader, source)
      gl!.compileShader(shader)
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.warn('DitherReveal shader error:', gl!.getShaderInfoLog(shader))
      }
      return shader
    }

    const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    const program = gl.createProgram()!

    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('DitherReveal program link error:', gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)
    gl.deleteShader(vertShader)
    gl.deleteShader(fragShader)

    // Blend setup for transparency over background
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    )

    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 'uTime')
    const uMouse = gl.getUniformLocation(program, 'uMouse')
    const uMouseActive = gl.getUniformLocation(program, 'uMouseActive')
    const uRevealRadius = gl.getUniformLocation(program, 'uRevealRadius')
    const uRevealSoftness = gl.getUniformLocation(program, 'uRevealSoftness')
    const uPixelSize = gl.getUniformLocation(program, 'uPixelSize')
    const uDitherStyle = gl.getUniformLocation(program, 'uDitherStyle')
    const uWaveSpeed = gl.getUniformLocation(program, 'uWaveSpeed')
    const uWaveFrequency = gl.getUniformLocation(program, 'uWaveFrequency')
    const uWaveAmplitude = gl.getUniformLocation(program, 'uWaveAmplitude')
    const uWaveMargin = gl.getUniformLocation(program, 'uWaveMargin')
    const uCanvasAspect = gl.getUniformLocation(program, 'uCanvasAspect')
    const uImageAspect = gl.getUniformLocation(program, 'uImageAspect')
    const uResolution = gl.getUniformLocation(program, 'uResolution')
    const uFit = gl.getUniformLocation(program, 'uFit')
    const uFocusY = gl.getUniformLocation(program, 'uFocusY')

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([255, 255, 255, 0])
    )
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    let imgAspect = 1.5
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      if (img.naturalHeight > 0) {
        imgAspect = img.naturalWidth / img.naturalHeight
      }
      gl.bindTexture(gl.TEXTURE_2D, texture)
      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      } catch (err) {
        console.warn('Failed to upload texture:', err)
      }
    }
    img.src = imageSrc

    const mouseState = {
      x: 0.5,
      y: 0.5,
      active: 0,
      target: 0,
      entered: false,
    }

    function onPointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect()
      mouseState.x = (e.clientX - rect.left) / rect.width
      mouseState.y = 1.0 - (e.clientY - rect.top) / rect.height
      mouseState.entered = true
      mouseState.target = 1.0
    }

    const onPointerEnter = () => {
      mouseState.target = 1.0
    }
    const onPointerLeave = () => {
      mouseState.target = 0.0
    }

    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerenter', onPointerEnter)
    container.addEventListener('pointerleave', onPointerLeave)

    function updateSize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5)
      canvas!.width = Math.max(1, Math.floor(container!.clientWidth * dpr))
      canvas!.height = Math.max(1, Math.floor(container!.clientHeight * dpr))
      gl!.viewport(0, 0, canvas!.width, canvas!.height)
    }

    updateSize()
    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(container)

    const intersectObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.01 }
    )
    intersectObserver.observe(container)

    const startTime = performance.now()
    let animId = 0

    function loop() {
      animId = requestAnimationFrame(loop)
      if (!isVisibleRef.current) return

      const cfg = configRef.current
      const now = performance.now()
      mouseState.active += (mouseState.target - mouseState.active) * 0.09

      gl!.clearColor(0, 0, 0, 0)
      gl!.clear(gl!.COLOR_BUFFER_BIT)

      gl!.uniform1f(uTime, (now - startTime) / 1000)
      gl!.uniform2f(uMouse, mouseState.x, mouseState.y)
      gl!.uniform1f(uMouseActive, mouseState.entered ? mouseState.active : 0)
      gl!.uniform1f(uRevealRadius, cfg.revealRadius)
      gl!.uniform1f(uRevealSoftness, cfg.revealSoftness)
      gl!.uniform1f(uPixelSize, cfg.pixelSize)
      gl!.uniform1f(uDitherStyle, cfg.ditherStyle)
      gl!.uniform1f(uWaveSpeed, cfg.waveSpeed)
      gl!.uniform1f(uWaveFrequency, cfg.waveFrequency)
      gl!.uniform1f(uWaveAmplitude, cfg.waveAmplitude)
      gl!.uniform1f(uWaveMargin, cfg.waveMargin)
      gl!.uniform1f(uCanvasAspect, canvas!.width / canvas!.height)
      gl!.uniform1f(uImageAspect, imgAspect)
      gl!.uniform2f(uResolution, container!.clientWidth || 1, container!.clientHeight || 1)
      gl!.uniform1f(uFit, cfg.fit)
      gl!.uniform1f(uFocusY, cfg.focusY)

      gl!.drawArrays(gl!.TRIANGLES, 0, 3)
    }

    loop()

    return () => {
      cancelAnimationFrame(animId)
      resizeObserver.disconnect()
      intersectObserver.disconnect()
      img.onload = null
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerenter', onPointerEnter)
      container.removeEventListener('pointerleave', onPointerLeave)
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
      gl.deleteTexture(texture)
    }
  }, [imageSrc])

  return (
    <div
      ref={containerRef}
      className={`dither-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )
}
