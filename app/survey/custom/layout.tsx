import { SurveyProvider } from "@/lib/survey"

export default function CustomSurveyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SurveyProvider>{children}</SurveyProvider>
}
