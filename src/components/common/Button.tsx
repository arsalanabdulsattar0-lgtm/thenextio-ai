import React, { ReactNode } from 'react'
import './Button.css'

export interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: (e: React.MouseEvent) => void
  variant?: 'ghost' | 'primary' | 'pill'
  fillColor?: 'orange' | 'blue' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  icon?: boolean | ReactNode
  className?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'ghost',
  fillColor = 'orange',
  size = 'md',
  icon = true,
  className = '',
  target,
  rel,
  type = 'button',
}: ButtonProps) {
  const combinedClass = [
    'app-btn',
    `app-btn-${variant}`,
    `app-btn-fill-${fillColor}`,
    `app-btn-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const renderIcon = () => {
    if (!icon) return null
    if (typeof icon !== 'boolean') return icon
    return (
      <svg
        className="app-btn-arrow"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    )
  }

  const content = (
    <>
      <span className="app-btn-bg" aria-hidden="true" />
      <span className="app-btn-content">
        <span className="app-btn-text">{children}</span>
        {renderIcon()}
      </span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={combinedClass}
        onClick={onClick}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
      >
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={combinedClass} onClick={onClick}>
      {content}
    </button>
  )
}
