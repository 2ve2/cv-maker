import type { AnchorHTMLAttributes } from 'react'

interface InitialsProps {
  name: string
}

export function TemplateInitials({ name }: InitialsProps) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase()

  return <>{initials || 'CV'}</>
}

/**
 * Ensure a user-entered URL has a protocol so the browser treats it as
 * an absolute link instead of a relative path.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function normalizeUrl(url: string): string {
  const trimmed = url.trim()
  if (!trimmed) return '#'
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

/**
 * Anchor that always opens in a new tab with safe rel attributes and
 * normalizes the URL so values like "linkedin.com/in/jane" still work.
 */
export function ExternalLink({ href, children, ...rest }: ExternalLinkProps) {
  return (
    <a
      {...rest}
      href={normalizeUrl(href)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
