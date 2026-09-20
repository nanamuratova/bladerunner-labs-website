import { Logo } from '../components/Logo'
import { SectionLabel } from '../components/SectionLabel'
import { Contact } from '../sections/Contact'
import { Footer } from '../sections/Footer'
import { asset } from '../assets'
import type { Project } from '../data'

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
        <div className="mx-auto max-w-[1200px] border-b border-gray-200 px-6">
          <button
            type="button"
            onClick={onBack}
            className="brl-mono-label flex h-12 items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
          >
            <span aria-hidden="true">←</span> Back
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
          <div className="aspect-[16/10] overflow-hidden rounded-[var(--radius-24)] bg-gray-900">
            <img src={asset(project.image)} alt={project.name} className="h-full w-full object-cover" />
          </div>
        </section>

        {/* Overview */}
        <section className="grid grid-cols-1 gap-12 border-t border-gray-200 py-16 lg:grid-cols-[280px_1fr] lg:py-20">
          <h2 className="brl-h4">Overview</h2>
          <div className="max-w-2xl space-y-6">
            {project.overview.map((p, i) => (
              <p key={i} className="brl-body-lg text-gray-600">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="grid grid-cols-1 gap-12 border-t border-gray-200 py-16 lg:grid-cols-[280px_1fr] lg:py-20">
          <h2 className="brl-h4">Capabilities</h2>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-16)] border border-gray-200 bg-gray-200 sm:grid-cols-2">
            {project.capabilities.map((c) => (
              <div key={c.title} className="bg-white p-8">
                <h3 className="brl-h6">{c.title}</h3>
                <p className="brl-body mt-3 text-gray-600">{c.body}</p>
              </div>
            ))}
          </div>
        </section>
        {/* On to the other project, without going back to the home page */}
        <section className="border-t border-gray-200 py-16 lg:py-20">
          <button
            type="button"
            onClick={() => onOpenProject(next)}
            className="group grid w-full grid-cols-1 items-center gap-8 text-left sm:grid-cols-[200px_1fr_auto]"
          >
            <span className="aspect-[16/10] overflow-hidden rounded-[var(--radius-16)] bg-gray-900">
              <img
                src={asset(next.image)}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </span>
            <span className="block">
              <span className="brl-mono-label block text-gray-500">Next project</span>
              <span className="brl-h3 mt-2 block transition-colors group-hover:text-accent">{next.name}</span>
              <span className="brl-body mt-2 block text-gray-600">{next.category}</span>
            </span>
            <span
              aria-hidden="true"
              className="hidden text-gray-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent sm:block"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </button>
        </section>
      </main>

      {/* Same contact section and footer as the home page */}
      <Contact />
      <Footer />
    </div>
  )
}
