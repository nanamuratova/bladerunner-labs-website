import { Logo } from '../components/Logo'
import { SectionLabel } from '../components/SectionLabel'
import { Contact } from '../sections/Contact'
import { Footer } from '../sections/Footer'
import { asset } from '../assets'
import { homePath, navigateOnClick, projectPath } from '../routing'
import type { Project } from '../data'

/**
 * Status tags stay inside the palette: shipped work carries the accent, work in
 * flight is quieter, and anything not started is plain grey.
 */
function statusTag(state: string) {
  const key = state.toLowerCase()
  if (key.startsWith('ready')) return 'bg-accent-subtle text-accent'
  if (key.startsWith('evolving')) return 'border border-accent text-accent'
  return 'bg-gray-100 text-gray-600'
}

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
          <a href={homePath()} onClick={navigateOnClick(onBack)} aria-label="BladeRunner Labs home">
            <Logo />
          </a>
        </div>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6">
          <a
            href={homePath()}
            onClick={navigateOnClick(onBack)}
            className="brl-mono-label group flex h-12 items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
          >
            <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">←</span>
            Back
          </a>
          <a
            href={projectPath(next.id)}
            onClick={navigateOnClick(() => onOpenProject(next))}
            className="brl-mono-label group flex h-12 items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
          >
            <span className="hidden sm:inline">Next project:</span> {next.name}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
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
                // Ruled rows rather than bullets: the items are each a kind of
                // workload, and the lines let them read as a set.
                <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
                  {section.bullets.map((item) => (
                    <li key={item} className="brl-body py-4 text-gray-900">
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
            {/* Same boxed grid as the capabilities above. */}
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-16)] border border-gray-200 bg-gray-200 sm:grid-cols-2">
              {project.results.metrics.map((m) => (
                <div key={m.label} className="bg-white p-8">
                  <p className="brl-h3 text-accent">{m.value}</p>
                  <p className="brl-body mt-2 text-gray-600">{m.label}</p>
                </div>
              ))}
            </div>
            <p className="brl-body-sm mt-6 text-gray-500">{project.results.note}</p>
          </ArticleRow>
        )}

        {project.status && (
          <ArticleRow heading="Where it stands">
            {/* One row per item with its own status tag, as the deck presents it. */}
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-16)] border border-gray-200 bg-gray-200">
              {project.status.flatMap((group) =>
                group.items.map((item) => (
                  <div
                    key={`${group.state}-${item}`}
                    className="grid grid-cols-1 items-center gap-2 bg-white px-6 py-5 sm:grid-cols-[160px_1fr] sm:gap-6"
                  >
                    <span className={`brl-mono-label w-fit rounded-full px-3 py-1 ${statusTag(group.state)}`}>
                      {group.state}
                    </span>
                    <span className="brl-body text-gray-900">{item}</span>
                  </div>
                )),
              )}
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
