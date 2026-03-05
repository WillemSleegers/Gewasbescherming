"use client"

interface RadioOption {
  value: string
  label: string
}

interface BlaiseRadioGroupProps {
  id: string
  label: React.ReactNode
  value: string
  onChange: (value: string) => void
  options: RadioOption[]
  required?: boolean
  hint?: string
}

export function BlaiseRadioGroup({
  id,
  label,
  value,
  onChange,
  options,
  required,
  hint,
}: BlaiseRadioGroupProps) {
  return (
    <fieldset className="mb-4">
      <legend className="text-survey-text mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </legend>
      {hint && <p className="text-sm text-gray-500 mb-2">{hint}</p>}
      <div className="space-y-1">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer text-survey-text"
          >
            <input
              type="radio"
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 accent-survey-primary"
              required={required}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
