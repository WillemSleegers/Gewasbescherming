"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { notFound } from "next/navigation"
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
  getSurvey,
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
      router.push(`/survey/${survey.id}/${skipTarget}`)
    } else if (page.nextPageId) {
      router.push(`/survey/${survey.id}/${page.nextPageId}`)
    } else if (nextPage) {
      router.push(`/survey/${survey.id}/${nextPage.id}`)
    }
  }

  const handlePrevious = () => {
    const prevPageId = navigationHistory[navigationHistory.length - 1]
    if (prevPageId) {
      popHistory()
      router.push(`/survey/${survey.id}/${prevPageId}`)
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
    const firstPage = survey.pages[0]
    // On refresh, state is gone but URL is not — redirect to first page
    if (visitedPages.size === 0 && page.id !== firstPage.id) {
      router.replace(`/survey/${survey.id}/${firstPage.id}`)
      return
    }
    markPageVisited(page.id)
  // visitedPages intentionally omitted from deps: only needs the value at the time page.id changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.id, markPageVisited, survey, router])

  const tocItems = survey.toc ??
    survey.pages
      .filter((p) => !p.hideFromNav)
      .map((p) => ({ pageId: p.id, label: p.label, parentId: p.parentId }))

  // The active TOC item is the last one whose page appears at or before the current page
  const activeTocPageId = tocItems
    .filter((item) => survey.pages.findIndex((p) => p.id === item.pageId) <= currentIndex)
    .at(-1)?.pageId

  const navItems = tocItems.map((item) => ({
    id: item.pageId,
    label: item.label,
    active: item.pageId === activeTocPageId,
    visited: visitedPages.has(item.pageId),
    parentId: item.parentId,
  }))

  const handleNavClick = (pageId: string) => {
    router.push(`/survey/${survey.id}/${pageId}`)
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

export default function SurveyPage() {
  const params = useParams()
  const surveyId = params.surveyId as string
  const pageId = params.pageId as string

  const survey = getSurvey(surveyId)

  if (!survey) {
    notFound()
  }

  const currentIndex = survey.pages.findIndex((p) => p.id === pageId)

  if (currentIndex === -1) {
    notFound()
  }

  const page = survey.pages[currentIndex]

  return (
    <SurveyPageInner survey={survey} page={page} currentIndex={currentIndex} />
  )
}
