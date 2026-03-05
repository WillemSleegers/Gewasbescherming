"use client"

interface BlaiseTextInputProps {
  id: string
  label: React.ReactNode
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  hint?: string
  width?: "full" | "half"
}

export function BlaiseTextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
  hint,
  width = "full",
}: BlaiseTextInputProps) {
  const widthClass = width === "half" ? "max-w-[14rem]" : "max-w-md"
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-survey-text font-bold mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {hint && <p className="text-sm text-gray-500 mb-2 whitespace-pre-line">{hint}</p>}
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full ${widthClass} px-2 py-1 border border-survey-text-muted text-survey-text bg-survey-white`}
        required={required}
      />
    </div>
  )
}
