import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

/**
 * Thin wrapper over the design system's .brl-button classes (components.css).
 * Variants, sizes, states and focus rings all live there — this file only
 * picks the right class names, so buttons stay in step with the system.
 *
 * On a dark section, wrap the area in data-theme="dark"; the semantic tokens
 * handle the rest.
 */

type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'link'
type Size = 'sm' | 'md' | 'lg'

type BaseProps = {
  variant?: Variant
  size?: Size
  onDark?: boolean
  className?: string
}

const variantClass: Record<Variant, string> = {
  primary: '',
  secondary: 'brl-button--secondary',
  tertiary: 'brl-button--tertiary',
  ghost: 'brl-button--ghost',
  link: 'brl-button--link',
}

const sizeClass: Record<Size, string> = {
  sm: 'brl-button--sm',
  md: '',
  lg: 'brl-button--lg',
}

function classesFor(variant: Variant, size: Size, onDark: boolean, className: string) {
  // Ghost and link buttons are text-sized: no padding, radius or min-height.
  const sizing = variant === 'ghost' || variant === 'link' ? '' : sizeClass[size]
  const theme = onDark ? 'brl-button--on-dark' : ''
  return ['brl-button', variantClass[variant], sizing, theme, className].filter(Boolean).join(' ')
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>
type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function Button({ variant = 'primary', size = 'md', onDark = false, className = '', ...rest }: ButtonProps) {
  return <button type="button" className={classesFor(variant, size, onDark, className)} {...rest} />
}

export function ButtonLink({ variant = 'primary', size = 'md', onDark = false, className = '', ...rest }: LinkProps) {
  return <a className={classesFor(variant, size, onDark, className)} {...rest} />
}
