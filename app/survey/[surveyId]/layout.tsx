import { SurveyProvider } from "@/lib/survey"

export default function SurveyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SurveyProvider>{children}</SurveyProvider>
}
