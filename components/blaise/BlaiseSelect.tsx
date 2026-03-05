"use client"

interface SelectOption {
  value: string
  label: string
}

interface BlaiseSelectProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  required?: boolean
  hint?: string
  width?: "full" | "half"
}

export function BlaiseSelect({
  id,
  label,
  value,
  onChange,
  options,
  required,
  hint,
  width = "full",
}: BlaiseSelectProps) {
  const widthClass = width === "half" ? "max-w-[14rem]" : "max-w-md"
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-survey-text font-bold mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {hint && <p className="text-sm text-gray-500 mb-2">{hint}</p>}
      <div className={`relative w-full ${widthClass}`}>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-2 py-1 pr-8 border border-survey-text-muted text-survey-text bg-survey-white appearance-none rounded-none"
          required={required}
        >
          <option value="">-- Selecteer --</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-survey-text">▾</span>
      </div>
    </div>
  )
}
