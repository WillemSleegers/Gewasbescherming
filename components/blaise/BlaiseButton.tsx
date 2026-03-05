"use client"

interface BlaiseButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "submit"
}

export function BlaiseButton({ children, onClick, variant = "primary" }: BlaiseButtonProps) {
  const colorClass = variant === "submit"
    ? "bg-survey-accent text-survey-white"
    : "bg-survey-primary text-survey-white"
  return (
    <button
      onClick={onClick}
      className={`w-30 h-7.5 pt-0.5 align-bottom font-normal cursor-pointer rounded ${colorClass}`}
    >
      {children}
    </button>
  )
}
