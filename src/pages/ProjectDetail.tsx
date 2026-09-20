import { Logo } from '../components/Logo'
import { SectionLabel } from '../components/SectionLabel'
import { Contact } from '../sections/Contact'
import { Footer } from '../sections/Footer'
import { asset } from '../assets'
import type { Project } from '../data'

/** Every article row: the heading on the left, the content on the right. */
function ArticleRow({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-12 border-t border-gray-200 py-16 lg:grid-cols-[280px_1fr] lg:py-20">
      <h2 className="brl-h4">{heading}</h2>
      <div className="max-w-2xl">{children}</div>
    </section>
  )
}

export function ProjectDetail({
  project,
  next,
  onOpenProject,
  onBack,
}: {
  project: Project
  next: Project
  onOpenProject: (p: Project) => void
  onBack: () => void
}) {
  const contain = project.heroFit === 'contain'
  return (
    // Keyed on the project so the fade replays when you move to the next one.
    <div key={project.id} className="article-in min-h-screen bg-white text-gray-900">
      {/* Header: the logo bar, then a sub-header holding Back */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1200px] items-center border-b border-gray-200 px-6">
          <button type="button" onClick={onBack} className="cursor-pointer" aria-label="BladeRunner Labs home">
            <Logo />
          </button>
        </div>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6">
          <button
            type="button"
            onClick={onBack}
            className="brl-mono-label group flex h-12 items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
          >
            <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">←</span>
            Back
          </button>
          <button
            type="button"
            onClick={() => onOpenProject(next)}
            className="brl-mono-label group flex h-12 items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
          >
            <span className="hidden sm:inline">Next project:</span> {next.name}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6">
        {/* Hero */}
        <section className="grid grid-cols-1 gap-16 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-24">
          <div className="flex flex-col justify-center">
            <SectionLabel>{project.category}</SectionLabel>
            <h1 className="brl-h1 mt-3">{project.name}</h1>
            <p className="brl-body-lg mt-6 max-w-xl text-gray-600">{project.description}</p>
          </div>
          <div
            className={`aspect-[16/10] overflow-hidden ${
              contain ? 'bg-white' : 'rounded-[var(--radius-24)] bg-gray-900'
            }`}
          >
            <img
              src={asset(project.heroImage ?? project.image)}
              alt={project.name}
              className={`h-full w-full ${contain ? 'object-contain' : 'object-cover'}`}
            />
          </div>
        </section>

        <ArticleRow heading="Overview">
          <div className="space-y-6">
            {project.overview.map((p, i) => (
              <p key={i} className="brl-body-lg text-gray-600">
                {p}
              </p>
            ))}
          </div>
        </ArticleRow>

        {project.sections?.map((section) => (
          <ArticleRow key={section.heading} heading={section.heading}>
            <div className="space-y-6">
              {section.paragraphs?.map((p, i) => (
                <p key={i} className="brl-body-lg text-gray-600">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="flex flex-col gap-2">
                  {section.bullets.map((item) => (
                    <li key={item} className="brl-body relative pl-5 text-gray-600">
                      <span className="absolute top-2 left-0 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </ArticleRow>
        ))}

        <ArticleRow heading="Capabilities">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-16)] border border-gray-200 bg-gray-200 sm:grid-cols-2">
            {project.capabilities.map((c) => (
              <div key={c.title} className="bg-white p-8">
                <h3 className="brl-h6">{c.title}</h3>
                <p className="brl-body mt-3 text-gray-600">{c.body}</p>
              </div>
            ))}
          </div>
        </ArticleRow>

        {project.results && (
          <ArticleRow heading="Measured results">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {project.results.metrics.map((m) => (
                <div key={m.label}>
                  <p className="brl-h3 text-accent">{m.value}</p>
                  <p className="brl-body mt-2 text-gray-600">{m.label}</p>
                </div>
              ))}
            </div>
            <p className="brl-body-sm mt-8 text-gray-500">{project.results.note}</p>
          </ArticleRow>
        )}

        {project.status && (
          <ArticleRow heading="Where it stands">
            <div className="flex flex-col gap-8">
              {project.status.map((group) => (
                <div key={group.state} className="grid grid-cols-1 gap-3 sm:grid-cols-[140px_1fr]">
                  <span className="brl-mono-label pt-1 text-gray-500">{group.state}</span>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="brl-body text-gray-900">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ArticleRow>
        )}

      </main>

      {/* Same contact section and footer as the home page */}
      <Contact />
      <Footer />
    </div>
  )
}
