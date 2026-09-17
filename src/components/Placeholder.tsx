/**
 * Neutral gray placeholder for imagery. Deliberately no generated artwork —
 * a calm token-colored surface with a faint grid and a label.
 * Replace these with real assets when artwork is supplied.
 */
export function Placeholder({
  label = 'Visual',
  className = '',
  ratio = 'aspect-[16/10]',
}: {
  label?: string
  className?: string
  ratio?: string
}) {
  return (
    <div
      className={`relative ${ratio} overflow-hidden rounded-[var(--radius-16)] bg-gray-100 ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(var(--gray-200) 1px, transparent 1px), linear-gradient(90deg, var(--gray-200) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
      role="img"
      aria-label={`${label} — image placeholder`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="brl-mono-label text-gray-400">{label}</span>
      </div>
    </div>
  )
}
