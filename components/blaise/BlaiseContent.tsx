interface BlaiseContentProps {
  children: React.ReactNode
}

export function BlaiseContent({ children }: BlaiseContentProps) {
  return (
    <main className="bg-survey-white flex-1 flex flex-col min-h-130 px-8 py-6">
      {children}
    </main>
  )
}

interface BlaiseContentSectionProps {
  title?: React.ReactNode
  children: React.ReactNode
}

export function BlaiseContentSection({
  title,
  children,
}: BlaiseContentSectionProps) {
  return (
    <section className="mb-6">
      {title && <h2 className="text-survey-text">{title}</h2>}
      <div className="text-survey-text">{children}</div>
    </section>
  )
}
