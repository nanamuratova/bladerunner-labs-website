import { useEffect, useState } from 'react'
import { Logo } from './components/Logo'
import { ProjectDetail } from './pages/ProjectDetail'
import { projects, services, type Project } from './data'
import { asset } from './assets'

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

export default function App() {
  const [active, setActive] = useState<Project | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [active])

  if (active) {
    return <ProjectDetail project={active} onBack={() => setActive(null)} />
  }
  return <Home onOpenProject={setActive} />
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
                className={`brl-body-sm font-medium transition-colors ${
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
                  className={`brl-body flex min-h-12 items-center font-medium ${
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="brl-mono-label text-accent">{children}</span>
}

/* ------------------------------------------------------------------ */

function HeroBubbles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Large fields that run off the canvas, then two smaller shapes for scale. */}
      <span className="bubble animate-floatA h-[560px] w-[560px] right-[-14%] bottom-[-38%] sm:h-[1100px] sm:w-[1100px]" />
      <span className="bubble bubble--violet animate-floatB h-[420px] w-[420px] right-[6%] top-[-26%] sm:h-[860px] sm:w-[860px]" />
      <span className="bubble bubble--edge animate-floatC h-[360px] w-[360px] left-[-16%] bottom-[-26%] sm:h-[760px] sm:w-[760px]" />
      <span className="bubble bubble--blush animate-floatC h-[140px] w-[140px] right-[30%] top-[14%] sm:h-[260px] sm:w-[260px]" />
      <span className="bubble bubble--violet animate-floatA h-[70px] w-[70px] right-[44%] bottom-[18%] sm:h-[130px] sm:w-[130px]" />
    </div>
  )
}

function Hero() {
  return (
    <section id="top" className="hero-bg relative overflow-hidden">
      <HeroBubbles />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
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
              <button
                type="button"
                onClick={() => onOpenProject(p)}
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
              </button>
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

const contactColumnOne = [
  { label: 'Office', value: 'Tel Aviv, Israel', href: null },
  { label: 'Phone', value: '+972 52 5933277', href: 'tel:+972525933277' },
  { label: 'Email', value: 'info@bladerunner.io', href: 'mailto:info@bladerunner.io' },
] as const

const socialLinks = [
  { name: 'LinkedIn', slug: 'linkedin', href: 'https://www.linkedin.com/company/bladerunner-labs/' },
  { name: 'GitHub', slug: 'github', href: 'https://github.com/bladerunnerlabs' },
] as const

function Contact() {
  return (
    <section id="contact" className="bg-gray-50">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          {/* Left — intro */}
          <div>
            <SectionLabel>Contact us</SectionLabel>
            <h2 className="brl-h2 mt-3">R&amp;D Consulting</h2>
            <p className="brl-body-lg mt-6 max-w-md text-gray-600">
              Tell us about the problem you're working on. We partner with teams on applied AI,
              computing infrastructure, and the tools that hold them together — from early scoping
              through to production.
            </p>
          </div>

          {/* Right — details in two columns */}
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            {/* Column 1 */}
            <div className="space-y-8">
              {contactColumnOne.map((row) => (
                <div key={row.label}>
                  <span className="brl-mono-label text-gray-500">{row.label}</span>
                  {row.href ? (
                    <a
                      href={row.href}
                      className="brl-h6 mt-3 block text-gray-900 transition-colors hover:text-accent"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span className="brl-h6 mt-3 block text-gray-900">{row.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="space-y-8">
              <div>
                <span className="brl-mono-label text-gray-500">Careers</span>
                <a
                  href="mailto:jobs@bladerunner.io"
                  className="brl-h6 mt-3 block text-gray-900 transition-colors hover:text-accent"
                >
                  jobs@bladerunner.io
                </a>
              </div>
              <div>
                <span className="brl-mono-label text-gray-500">Follow us</span>
                <div className="mt-3 space-y-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.slug}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 text-gray-900 transition-colors hover:text-accent"
                    >
                      <span className="brl-h6">{s.name}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      >
                        <path d="M7 17 17 7M9 7h8v8" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="border-t border-gray-300 py-10">
          <span className="brl-body-sm text-gray-500">
            Copyright © {new Date().getFullYear()} BladeRunner Labs. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
