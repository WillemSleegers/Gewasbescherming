"use client"

import {
  BlaiseTextInput,
  BlaiseTextArea,
  BlaiseRadioGroup,
  BlaiseCheckboxGroup,
  BlaiseNumberInput,
  BlaiseSelect,
  BlaiseContentSection,
} from "@/components/blaise"
import { useSurvey } from "./context"
import type { Question, Section, SurveyAnswers } from "./types"

export function interpolate(text: string, answers: SurveyAnswers): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const val = answers[key]
    return typeof val === "string" ? val : `[${key}]`
  })
}

export function QuestionRenderer({ question }: { question: Question }) {
  const { getAnswer, setAnswer, answers } = useSurvey()

  const value = getAnswer(question.id)
  const label = interpolate(question.label, answers)

  switch (question.type) {
    case "text":
      return (
        <BlaiseTextInput
          id={question.id}
          label={label}
          value={typeof value === "string" ? value : ""}
          onChange={(v) => setAnswer(question.id, v)}
          placeholder={question.placeholder}
          required={question.required}
          hint={question.hint}
          width={question.width}
        />
      )
    case "textarea":
      return (
        <BlaiseTextArea
          id={question.id}
          label={label}
          value={typeof value === "string" ? value : ""}
          onChange={(v) => setAnswer(question.id, v)}
          placeholder={question.placeholder}
          rows={question.rows}
          required={question.required}
        />
      )
    case "radio":
      return (
        <BlaiseRadioGroup
          id={question.id}
          label={label}
          value={typeof value === "string" ? value : ""}
          onChange={(v) => setAnswer(question.id, v)}
          options={question.options}
          required={question.required}
          hint={question.hint}
        />
      )
    case "checkbox":
      return (
        <BlaiseCheckboxGroup
          id={question.id}
          label={label}
          values={Array.isArray(value) ? value : []}
          onChange={(v) => setAnswer(question.id, v)}
          options={question.options}
          required={question.required}
        />
      )
    case "number":
      return (
        <BlaiseNumberInput
          id={question.id}
          label={label}
          value={typeof value === "string" ? value : ""}
          onChange={(v) => setAnswer(question.id, v)}
          placeholder={question.placeholder}
          min={question.min}
          max={question.max}
          required={question.required}
        />
      )
    case "select":
      return (
        <BlaiseSelect
          id={question.id}
          label={label}
          value={typeof value === "string" ? value : ""}
          onChange={(v) => setAnswer(question.id, v)}
          options={question.options}
          required={question.required}
          hint={question.hint}
          width={question.width}
        />
      )
  }
}

export function SectionRenderer({ section }: { section: Section }) {
  const { answers } = useSurvey()
  const text = interpolate(section.text, answers)
  return (
    <BlaiseContentSection title={section.title}>
      <p className="whitespace-pre-line">{text}</p>
    </BlaiseContentSection>
  )
}
