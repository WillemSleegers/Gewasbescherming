"use client"

interface CheckboxOption {
  value: string
  label: string
}

interface BlaiseCheckboxGroupProps {
  id: string
  label: React.ReactNode
  values: string[]
  onChange: (values: string[]) => void
  options: CheckboxOption[]
  required?: boolean
}

export function BlaiseCheckboxGroup({
  id,
  label,
  values,
  onChange,
  options,
  required,
}: BlaiseCheckboxGroupProps) {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...values, optionValue])
    } else {
      onChange(values.filter((v) => v !== optionValue))
    }
  }

  return (
    <fieldset className="mb-4">
      <legend className="text-survey-text mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </legend>
      <div className="space-y-1">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer text-survey-text"
          >
            <input
              type="checkbox"
              name={`${id}-${option.value}`}
              checked={values.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              className="w-4 h-4 accent-survey-primary"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
