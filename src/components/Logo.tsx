// BladeRunner Labs logo artwork, supplied as SVG in public/assets/logo/.
//   lockup   — mark + "BLADERUNNER LABS" wordmark (default, used in the header)
//   wordmark — typography only
//   mark     — the connector glyph on its own
//   stacked  — "BLADE / RUNNER LABS" on two lines, for narrow or square spaces
// "LABS" and the glyph bar carry the accent; on a dark surface the whole mark
// is knocked out to white.

import { asset } from '../assets'

const sources = {
  lockup: asset('/assets/logo/lockup.svg'),
  wordmark: asset('/assets/logo/wordmark.svg'),
  mark: asset('/assets/logo/mark.svg'),
  stacked: asset('/assets/logo/stacked.svg'),
} as const

type Variant = keyof typeof sources

type LogoProps = {
  className?: string
  onDark?: boolean
  variant?: Variant
  /** Legacy props kept so existing call sites keep working. */
  markOnly?: boolean
  wordmark?: boolean
}

const defaultHeight: Record<Variant, string> = {
  lockup: 'h-5',
  wordmark: 'h-5',
  mark: 'h-6',
  stacked: 'h-10',
}

/** Connector mark only. */
export function LogoMark({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return <Logo variant="mark" className={className} onDark={onDark} />
}

export function Logo({ className = '', onDark = false, variant, markOnly = false, wordmark = false }: LogoProps) {
  const resolved: Variant = variant ?? (markOnly ? 'mark' : wordmark ? 'wordmark' : 'lockup')
  return (
    <img
      src={sources[resolved]}
      alt="BladeRunner Labs"
      className={`w-auto ${className || defaultHeight[resolved]}`}
      style={onDark ? { filter: 'brightness(0) invert(1)' } : undefined}
    />
  )
}
