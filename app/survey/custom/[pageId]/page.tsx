"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  BlaiseLayout,
  BlaiseHeader,
  BlaiseTitleBar,
  BlaiseNavigation,
  BlaiseContent,
  BlaiseInfoPanel,
  BlaiseButton,
} from "@/components/blaise"
import {
  getCustomSurvey,
  useSurvey,
  isQuestion,
  isSection,
  QuestionRenderer,
  SectionRenderer,
  type Survey,
  type SurveyPage,
} from "@/lib/survey"

function PageContent({
  survey,
  page,
  currentIndex,
}: {
  survey: Survey
  page: SurveyPage
  currentIndex: number
}) {
  const router = useRouter()
  const { answers, navigationHistory, pushHistory, popHistory } = useSurvey()

  const isLastPage = currentIndex === survey.pages.length - 1
  const nextPage = !isLastPage ? survey.pages[currentIndex + 1] : null

  const getSkipTarget = (): string | null => {
    for (const item of page.content) {
      if (isQuestion(item) && item.type === "radio") {
        const answer = answers[item.id]
        if (answer) {
          const selected = item.options.find((opt) => opt.value === answer)
          if (selected?.skipTo) return selected.skipTo
        }
      }
    }
    return null
  }

  const handleNext = () => {
    pushHistory(page.id)
    const skipTarget = getSkipTarget()
    if (skipTarget) {
      router.push(`/survey/custom/${skipTarget}`)
    } else if (page.nextPageId) {
      router.push(`/survey/custom/${page.nextPageId}`)
    } else if (nextPage) {
      router.push(`/survey/custom/${nextPage.id}`)
    }
  }

  const handlePrevious = () => {
    const prevPageId = navigationHistory[navigationHistory.length - 1]
    if (prevPageId) {
      popHistory()
      router.push(`/survey/custom/${prevPageId}`)
    }
  }

  const handleSubmit = () => {
    alert("Vragenlijst verzonden! (Demo - geen data opgeslagen)")
  }

  return (
    <>
      <h1 className="text-xl font-bold text-survey-text mb-4">{page.title}</h1>

      <div className="mb-6">
        {page.content.map((item, i) => {
          if (isQuestion(item)) {
            return <QuestionRenderer key={item.id} question={item} />
          }
          if (isSection(item)) {
            return <SectionRenderer key={`section-${i}`} section={item} />
          }
          return null
        })}
      </div>

      <div className="flex gap-4">
        {navigationHistory.length > 0 && (
          <BlaiseButton onClick={handlePrevious}>Vorige</BlaiseButton>
        )}
        {page.isSubmitPage ? (
          <BlaiseButton onClick={handleSubmit}>Verzenden</BlaiseButton>
        ) : (
          <BlaiseButton onClick={handleNext}>Volgende</BlaiseButton>
        )}
      </div>
    </>
  )
}

function SurveyPageInner({
  survey,
  page,
  currentIndex,
}: {
  survey: Survey
  page: SurveyPage
  currentIndex: number
}) {
  const router = useRouter()
  const { visitedPages, markPageVisited } = useSurvey()

  useEffect(() => {
    markPageVisited(page.id)
  }, [page.id, markPageVisited])

  const navItems = survey.pages.map((p, i) => ({
    id: p.id,
    label: p.label,
    active: i === currentIndex,
    visited: visitedPages.has(p.id),
    parentId: p.parentId,
  }))

  const handleNavClick = (pageId: string) => {
    router.push(`/survey/custom/${pageId}`)
  }

  return (
    <BlaiseLayout>
      <BlaiseHeader />

      <div className="flex">
        <BlaiseTitleBar title={survey.title} subtitle={survey.subtitle} />
        <div className="flex-1 border-t-20 border-t-survey-white bg-survey-accent"></div>
        <div className="border-t-20 border-t-survey-white bg-survey-accent flex items-center">
          <BlaiseInfoPanel
            companyName={survey.company.name}
            contactPerson={survey.company.contactPerson}
            correspondenceNumber={survey.company.correspondenceNumber}
          />
        </div>
      </div>

      <div className="flex">
        <BlaiseNavigation items={navItems} onItemClick={handleNavClick} activePageId={page.id} />
        <BlaiseContent>
          <PageContent
            survey={survey}
            page={page}
            currentIndex={currentIndex}
          />
        </BlaiseContent>
      </div>
    </BlaiseLayout>
  )
}

export default function CustomSurveyPage() {
  const params = useParams()
  const router = useRouter()
  const pageId = params.pageId as string

  const [survey, setSurvey] = useState<Survey | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const customSurvey = getCustomSurvey()
    if (!customSurvey) {
      router.push("/survey/upload")
      return
    }
    setSurvey(customSurvey)
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <BlaiseLayout>
        <BlaiseHeader />
        <div className="p-8 text-survey-text">Laden...</div>
      </BlaiseLayout>
    )
  }

  if (!survey) {
    return null
  }

  const currentIndex = survey.pages.findIndex((p) => p.id === pageId)

  if (currentIndex === -1) {
    router.push(`/survey/custom/${survey.pages[0].id}`)
    return null
  }

  const page = survey.pages[currentIndex]

  return (
    <SurveyPageInner survey={survey} page={page} currentIndex={currentIndex} />
  )
}
