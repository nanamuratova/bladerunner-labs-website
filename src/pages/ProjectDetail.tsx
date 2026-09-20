import { Logo } from '../components/Logo'
import { SectionLabel } from '../components/SectionLabel'
import { Contact } from '../sections/Contact'
import { Footer } from '../sections/Footer'
import { asset } from '../assets'
import { iconChipStyle, uiIcons } from '../icons'
import { homePath, navigateOnClick, projectPath } from '../routing'
import { headerClass, useScrolled } from '../components/useScrolled'
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

/**
 * Every article row: the heading on the left, the content on the right. Rows
 * alternate white and grey the way the home page separates its sections, so the
 * background does the dividing instead of a rule.
 */
function ArticleRow({
  heading,
  tone,
  children,
}: {
  heading: string
  tone: 'white' | 'grey'
  children: React.ReactNode
}) {
  return (
    <section className={tone === 'grey' ? 'bg-gray-50' : 'bg-white'}>
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[280px_1fr] lg:py-20">
        <h2 className="brl-h4">{heading}</h2>
        <div className="max-w-2xl">{children}</div>
      </div>
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
  // The sub-header is what sticks, so it takes its border once the logo row has
  // scrolled past rather than at the first pixel.
  const stuck = useScrolled(72)

  const rows: { heading: string; content: React.ReactNode }[] = [
    {
      heading: 'Overview',
      content: (
        <div className="space-y-6">
          {project.overview.map((p, i) => (
            <p key={i} className="brl-body-lg text-gray-600">
              {p}
            </p>
          ))}
        </div>
      ),
    },
    ...(project.sections ?? []).map((section) => ({
      heading: section.heading,
      content: (
        <div className="space-y-6">
          {section.paragraphs?.map((p, i) => (
            <p key={i} className="brl-body-lg text-gray-600">
              {p}
            </p>
          ))}
          {section.stats && (
            // Figures in the same boxed grid the capabilities use.
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-16)] border border-gray-200 bg-gray-200 sm:grid-cols-2">
              {section.stats.map((stat) => (
                <div key={stat.label} className="bg-white p-8">
                  <p className="brl-h3 text-accent">{stat.value}</p>
                  <p className="brl-body mt-2 text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
          {section.bullets && (
            <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {section.bullets.map((item) => (
                <li key={item} className="brl-body flex gap-3 py-4 text-gray-600">
                  {/* mt-2 centres the 8px dot on a 24px first line, whatever the row padding */}
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {section.note && <p className="brl-body-sm text-gray-500">{section.note}</p>}
        </div>
      ),
    })),
    {
      heading: 'Capabilities',
      content: (
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-16)] border border-gray-200 bg-gray-200 sm:grid-cols-2">
          {project.capabilities.map((c, i) => (
            <div key={c.title} className="bg-white p-8">
              {/* Same icon chip as the home page services. */}
              <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-12)] bg-accent-subtle">
                <span
                  className="block h-[22px] w-[22px] bg-accent"
                  style={iconChipStyle(uiIcons[i % uiIcons.length])}
                />
              </span>
              <h3 className="brl-h6 mt-5">{c.title}</h3>
              <p className="brl-body mt-3 text-gray-600">{c.body}</p>
            </div>
          ))}
        </div>
      ),
    },
    ...(project.status
      ? [
          {
            heading: 'Where it stands',
            content: (
              // One row per item with its own status tag, as the deck presents it.
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
            ),
          },
        ]
      : []),
  ]

  return (
    // Keyed on the project so the fade replays when you move to the next one.
    <div key={project.id} className="article-in min-h-screen bg-white text-gray-900">
      {/* The logo row scrolls away. The navigation below it sticks, so it has to sit
          outside the header — a sticky element can only travel inside its parent. */}
      <header className="mx-auto flex h-20 max-w-[1200px] items-center px-6">
        <a href={homePath()} onClick={navigateOnClick(onBack)} aria-label="BladeRunner Labs home">
          <Logo />
        </a>
      </header>
      <nav className={headerClass(stuck)} aria-label="Article">
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
      </nav>

      <main id="main">
        {/* Hero */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 px-6 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-24">
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
          </div>
        </section>

        {rows.map((row, i) => (
          // Counted from the end, so the last row is always white and never
          // doubles up with the grey contact section below it.
          <ArticleRow key={row.heading} heading={row.heading} tone={(rows.length - 1 - i) % 2 === 0 ? 'white' : 'grey'}>
            {row.content}
          </ArticleRow>
        ))}
      </main>

      {/* Same contact section and footer as the home page */}
      <Contact />
      <Footer />
    </div>
  )
}
