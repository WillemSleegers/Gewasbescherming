"use client"

interface BlaiseNumberInputProps {
  id: string
  label: React.ReactNode
  value: string
  onChange: (value: string) => void
  placeholder?: string
  min?: number
  max?: number
  required?: boolean
}

export function BlaiseNumberInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  min,
  max,
  required,
}: BlaiseNumberInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-survey-text mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="number"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full max-w-xs px-2 py-1 border border-survey-text-muted text-survey-text bg-survey-white"
        required={required}
      />
    </div>
  )
}
