"use client"

import { createContext, useContext, useState, useCallback } from "react"
import type { SurveyAnswers } from "./types"

interface SurveyContextValue {
  answers: SurveyAnswers
  setAnswer: (questionId: string, value: string | string[]) => void
  getAnswer: (questionId: string) => string | string[] | undefined
  visitedPages: Set<string>
  markPageVisited: (pageId: string) => void
  navigationHistory: string[]
  pushHistory: (pageId: string) => void
  popHistory: () => void
}

const SurveyContext = createContext<SurveyContextValue | null>(null)

export function SurveyProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<SurveyAnswers>({})
  const [visitedPages, setVisitedPages] = useState<Set<string>>(new Set())
  const [navigationHistory, setNavigationHistory] = useState<string[]>([])

  const setAnswer = useCallback((questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }, [])

  const getAnswer = useCallback(
    (questionId: string) => answers[questionId],
    [answers]
  )

  const markPageVisited = useCallback((pageId: string) => {
    setVisitedPages((prev) => {
      const next = new Set(prev)
      next.add(pageId)
      return next
    })
  }, [])

  const pushHistory = useCallback((pageId: string) => {
    setNavigationHistory((prev) => [...prev, pageId])
  }, [])

  const popHistory = useCallback(() => {
    setNavigationHistory((prev) => prev.slice(0, -1))
  }, [])

  return (
    <SurveyContext.Provider
      value={{
        answers,
        setAnswer,
        getAnswer,
        visitedPages,
        markPageVisited,
        navigationHistory,
        pushHistory,
        popHistory,
      }}
    >
      {children}
    </SurveyContext.Provider>
  )
}

export function useSurvey() {
  const context = useContext(SurveyContext)
  if (!context) {
    throw new Error("useSurvey must be used within a SurveyProvider")
  }
  return context
}
