import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`rounded-card border-[1.5px] border-line bg-card ${className}`}>{children}</div>
  )
}
