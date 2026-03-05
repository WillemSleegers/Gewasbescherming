"use client"

interface BlaiseTextAreaProps {
  id: string
  label: React.ReactNode
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  required?: boolean
}

export function BlaiseTextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required,
}: BlaiseTextAreaProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-survey-text mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full max-w-md px-2 py-1 border border-survey-text-muted text-survey-text bg-survey-white resize-none"
        required={required}
      />
    </div>
  )
}
