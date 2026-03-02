import type { Survey } from "../types"
import gewasbescherming2024 from "./gewasbescherming-2024.json"
import gewasbescherming2024Agrovision from "./gewasbescherming-2026-agrovision.json"

const surveys: Record<string, Survey> = {
  "gewasbescherming-2024": gewasbescherming2024 as Survey,
  "gewasbescherming-2026-agrovision": gewasbescherming2024Agrovision as Survey,
}

export function getSurvey(id: string): Survey | undefined {
  return surveys[id]
}

export function getAllSurveys(): Survey[] {
  return Object.values(surveys)
}
