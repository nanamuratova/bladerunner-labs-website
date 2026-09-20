// BladeRunner Labs logo artwork in public/assets/logo/.
//
// These are the client's own files, in the brand blue #01509F with the cyan bar
// #009CE6 (colours read from their transparent PNG, not sampled from a JPEG):
//   wordmark — "BLADE / RUNNER" with LABS vertical (default, used in the header)
//   mark     — the bracket symbol on its own, also the favicon
//
// Both are PNG. The client has not supplied vector artwork; ask for SVG/AI/EPS
// when you can, and swap these out — the redrawn SVGs that shipped earlier had
// the wrong proportions (wordmark 2.96:1 against their 2.72:1, symbol 1.83:1
// against 1.69:1), so they are no longer used.
//
// lockupAlt and wordmarkAlt are the Figma-drawn horizontal versions in black and
// the site accent. They are not client artwork — keep them away from anything the
// client sees unless they supply a horizontal lockup.
// On a dark surface pass onDark, which knocks the whole mark out to white.

import { asset } from '../assets'

const sources = {
  wordmark: asset('/assets/logo/brand-wordmark.png'),
  mark: asset('/assets/logo/brand-mark.png'),
  lockupAlt: asset('/assets/logo/lockup.svg'),
  wordmarkAlt: asset('/assets/logo/wordmark.svg'),
} as const

type Variant = keyof typeof sources

type LogoProps = {
  className?: string
  onDark?: boolean
  variant?: Variant
  /** Legacy prop kept so existing call sites keep working. */
  markOnly?: boolean
}

const defaultHeight: Record<Variant, string> = {
  wordmark: 'h-8',
  mark: 'h-6',
  lockupAlt: 'h-4',
  wordmarkAlt: 'h-4',
}

/** Connector mark only. */
export function LogoMark({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return <Logo variant="mark" className={className} onDark={onDark} />
}

export function Logo({ className = '', onDark = false, variant, markOnly = false }: LogoProps) {
  const resolved: Variant = variant ?? (markOnly ? 'mark' : 'wordmark')
  return (
    <img
      src={sources[resolved]}
      alt="BladeRunner Labs"
      className={`w-auto ${className || defaultHeight[resolved]}`}
      style={onDark ? { filter: 'brightness(0) invert(1)' } : undefined}
    />
  )
}
