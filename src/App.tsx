import { useEffect, useState } from 'react'
import { Logo } from './components/Logo'
import { ButtonLink } from './components/Button'
import { ProjectDetail } from './pages/ProjectDetail'
import { projects, services, type Project } from './data'
import { asset } from './assets'
import { currentProjectId, homePath, navigateOnClick, projectPath, pushPath, replacePath } from './routing'
import { SectionLabel } from './components/SectionLabel'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Technology', href: '#technology' },
  { label: 'Contact', href: '#contact' },
]

// Service icons from the Figma template (masked in the accent color).
const serviceIcons = [
  asset('/assets/1b996.svg'), // Research & system architecture
  asset('/assets/ad5a0.svg'), // Software & infrastructure
  asset('/assets/61f57.svg'), // Performance & optimization
  asset('/assets/1be11.svg'), // Developer tools & workflows
]

// 'sweep' is the soft light curve, 'forms' the liquid shapes.
const HERO_IMAGE = 'forms' as 'sweep' | 'forms'

export default function App() {
  // The URL is the source of truth, so a project can be bookmarked and reloaded.
  const [projectId, setProjectId] = useState<string | null>(currentProjectId)

  useEffect(() => {
    const onPop = () => setProjectId(currentProjectId())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const active = projectId ? (projects.find((p) => p.id === projectId) ?? null) : null

  // An unknown /projects/<id> falls back to the home page rather than a blank one.
  useEffect(() => {
    if (projectId && !active) {
      replacePath(homePath())
      setProjectId(null)
    }
  }, [projectId, active])

  useEffect(() => {
    if (active) window.scrollTo({ top: 0 })
  }, [active?.id])

  const openProject = (p: Project) => {
    pushPath(projectPath(p.id))
    setProjectId(p.id)
  }

  const goHome = () => {
    pushPath(homePath())
    setProjectId(null)
    // Return to the projects grid rather than the top of the page.
    requestAnimationFrame(() => document.getElementById('projects')?.scrollIntoView())
  }

  if (active) {
    const i = projects.findIndex((p) => p.id === active.id)
    const next = projects[(i + 1) % projects.length]
    return (
      <ProjectDetail project={active} next={next} onOpenProject={openProject} onBack={goHome} />
    )
  }
  return <Home onOpenProject={openProject} />
}

function Home({ onOpenProject }: { onOpenProject: (p: Project) => void }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <a href="#main" className="brl-button sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Projects onOpenProject={onOpenProject} />
        <Services />
        <Technology />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      // Trigger when a section crosses the upper third of the viewport.
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
        scrolled ? 'border-gray-200 bg-white/85 backdrop-blur-md' : 'border-transparent bg-white'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6">
        <a href="#top" aria-label="BladeRunner Labs home">
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const current = activeId === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={current ? 'location' : undefined}
                className={`brl-mono-label transition-colors ${
                  current ? 'text-accent' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex h-6 w-6 flex-col justify-center gap-1.5" aria-hidden="true">
            <span className={`h-0.5 w-6 bg-gray-900 transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-6 bg-gray-900 transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-6 bg-gray-900 transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>
      {open && (
        <div id="mobile-nav" className="border-t border-gray-200 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-[1200px] flex-col px-6 py-4" aria-label="Primary">
            {NAV.map((item) => {
              const current = activeId === item.href.slice(1)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={current ? 'location' : undefined}
                  onClick={() => setOpen(false)}
                  className={`brl-mono-label flex min-h-12 items-center ${
                    current ? 'text-accent' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="top" className="hero-duotone relative overflow-hidden">
      <div
        className="hero-duotone__image"
        style={{ backgroundImage: `url(${asset(`/assets/hero-${HERO_IMAGE}.jpg`)})` }}
        aria-hidden="true"
      />
      <div className="hero-duotone__tint" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-12 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-36">
          <div className="flex flex-col justify-center">
            <SectionLabel>R&amp;D Consulting</SectionLabel>
            <h1 className="brl-h1 mt-3">
              Deep engineering.
              <br />
              Working technology
            </h1>
            <p className="brl-body-lg mt-8 max-w-xl text-gray-600">
              We research, design and build software across applied AI, computing infrastructure and
              developer tools. Our current product work focuses on DAGRunner and AI Couture.
            </p>
            <div className="mt-10">
              <ButtonLink href="#projects" size="lg">
                Explore our work
              </ButtonLink>
            </div>
          </div>
          <div aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="bg-gray-50">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:py-32">
        <div>
          <SectionLabel>About</SectionLabel>
          <h2 className="brl-h2 mt-3 max-w-lg">We build the applications, and the systems behind them</h2>
        </div>
        <div className="flex items-center">
          <p className="brl-body-lg text-gray-600">
            BladeRunner Labs is a technology and R&amp;D consulting company working across applied AI,
            computing infrastructure and developer tools. Our background spans distributed systems,
            storage, networking and low-level software. Today, our product work is focused on DAGRunner
            and AI Couture. Alongside these projects, we help other teams design, develop and improve
            complex software systems.
          </p>
        </div>
      </div>
    </section>
  )
}

function Projects({ onOpenProject }: { onOpenProject: (p: Project) => void }) {
  return (
    <section id="projects" className="mx-auto max-w-[1200px] px-6 py-24 lg:py-32">
      <div className="max-w-2xl">
        <SectionLabel>Current projects</SectionLabel>
        <h2 className="brl-h2 mt-3">Products we are building</h2>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.id}
            className="group flex flex-col overflow-hidden rounded-[var(--radius-24)] border border-gray-200 bg-white transition-colors hover:border-gray-300"
          >
            <div className="aspect-[16/10] overflow-hidden bg-gray-900">
              <img
                src={asset(p.image)}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col p-8">
              <span className="brl-mono-label text-gray-500">{p.category}</span>
              <h3 className="brl-h4 mt-3">{p.name}</h3>
              <p className="brl-body mt-4 flex-1 text-gray-600">{p.description}</p>
              <a
                href={projectPath(p.id)}
                onClick={navigateOnClick(() => onOpenProject(p))}
                className="group/link mt-8 inline-flex w-fit items-center gap-1.5 font-mono text-[length:var(--type-button-size)] leading-[var(--type-button-line)] font-medium tracking-[var(--type-button-tracking)] uppercase text-accent transition-colors hover:text-accent-hover"
              >
                Explore {p.name}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                >
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="bg-gray-50">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <SectionLabel>Services</SectionLabel>
          <h2 className="brl-h2 mt-3">Engineering support for complex software</h2>
          <p className="brl-body-lg mt-6 text-gray-600">
            From technical research and architecture to implementation and performance tuning, we help
            teams move their systems forward.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-24)] border border-gray-200 bg-border md:grid-cols-2">
          {services.map((s, i) => (
            <div key={s.title} className="flex flex-col bg-white p-10">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-12)] bg-accent-subtle">
                  <span
                    className="block h-[22px] w-[22px] bg-accent"
                    style={{
                      maskImage: `url(${serviceIcons[i]})`,
                      WebkitMaskImage: `url(${serviceIcons[i]})`,
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                    }}
                  />
                </span>
                <span className="brl-mono-label text-gray-400">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="brl-h5 mt-5 text-gray-900">{s.title}</h3>
              <p className="brl-body mt-4 text-gray-600">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Technology() {
  return (
    <section id="technology" className="bg-gray-0">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <SectionLabel>Technology</SectionLabel>
          <h2 className="brl-h2 mt-3">Depth across the stack</h2>
          <p className="brl-body-lg mt-6 text-gray-600">
            A working knowledge that runs from silicon and kernels up to inference pipelines and the
            tools teams build with every day.
          </p>
        </div>


        <LogoMarquee />
      </div>
    </section>
  )
}

// Third-party technology logos, loaded from simpleicons.org at runtime.
// These are tools BladeRunner Labs works with — not partners or endorsements.
const techLogos = [
  { name: 'NVIDIA', slug: 'nvidia' },
  { name: 'PyTorch', slug: 'pytorch' },
  { name: 'TensorFlow', slug: 'tensorflow' },
  { name: 'Kubernetes', slug: 'kubernetes' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Linux', slug: 'linux' },
  { name: 'Python', slug: 'python' },
  { name: 'Rust', slug: 'rust' },
  { name: 'Ray', slug: 'ray' },
  { name: 'Hugging Face', slug: 'huggingface' },
  { name: 'Apache Kafka', slug: 'apachekafka' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'Redis', slug: 'redis' },
  { name: 'Grafana', slug: 'grafana' },
] as const

function LogoMarquee() {
  const row = [...techLogos, ...techLogos]
  return (
    <div className="marquee-track mt-16">
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <div className="animate-marquee flex w-max items-center gap-16 pr-16">
          {row.map((logo, i) => (
            <img
              key={`${logo.slug}-${i}`}
              src={`https://cdn.simpleicons.org/${logo.slug}/1A1A1A`}
              alt={i < techLogos.length ? logo.name : ''}
              aria-hidden={i >= techLogos.length}
              className="h-8 w-auto flex-none opacity-45 grayscale transition-opacity duration-200 hover:opacity-100"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

