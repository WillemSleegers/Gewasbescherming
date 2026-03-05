import type { Survey } from "../types"
import gewasbescherming2026Agrovision from "./gewasbescherming-2026-agrovision.json"
import gewasbescherming2026Mps from "./gewasbescherming-2026-mps.json"

const surveys: Record<string, Survey> = {
  "gewasbescherming-2026-agrovision": gewasbescherming2026Agrovision as Survey,
  "gewasbescherming-2026-mps": gewasbescherming2026Mps as Survey,
}

export function getSurvey(id: string): Survey | undefined {
  return surveys[id]
}

export function getAllSurveys(): Survey[] {
  return Object.values(surveys)
}
