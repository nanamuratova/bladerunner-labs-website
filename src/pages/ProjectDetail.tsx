import { Logo } from '../components/Logo'
import { Button, ButtonLink } from '../components/Button'
import { Placeholder } from '../components/Placeholder'
import type { Project } from '../data'

export function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6">
          <button type="button" onClick={onBack} className="cursor-pointer" aria-label="BladeRunner Labs home">
            <Logo />
          </button>
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Back
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6">
        {/* Hero */}
        <section className="grid grid-cols-1 gap-16 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-24">
          <div className="flex flex-col justify-center">
            <span className="brl-mono-label text-accent">{project.category}</span>
            <h1 className="brl-h1 mt-3">{project.name}</h1>
            <p className="brl-body-lg mt-6 max-w-xl text-gray-600">{project.description}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="brl-body-sm rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-gray-600"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          {/* Review placeholder: replace with real project artwork */}
          <Placeholder label={`${project.name} — visual`} ratio="aspect-[4/3]" />
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

        {/* CTA */}
        <section className="border-t border-gray-200 py-20 text-center lg:py-28">
          <h2 className="brl-h3">Interested in {project.name}?</h2>
          <p className="brl-body-lg mx-auto mt-5 max-w-xl text-gray-600">
            Tell us about your workload or how you'd like to collaborate.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="mailto:info@bladerunner.io" size="lg">
              Get in touch
            </ButtonLink>
            <Button variant="secondary" size="lg" onClick={onBack}>
              Back to work
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-gray-900 bg-gray-900">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Logo onDark />
        <span className="brl-body-sm text-gray-400">
          © {new Date().getFullYear()} BladeRunner Labs · Based in Israel
        </span>
      </div>
    </footer>
  )
}
