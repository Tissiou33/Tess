import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/services', label: 'Services' },
  { to: '/equipe', label: 'Équipe' },
  { to: '/projets', label: 'Projets' },
  { to: '/blog', label: 'Blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'header-glass border-b border-line/80 shadow-[0_10px_30px_-26px_rgba(23,21,19,0.48)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-content mx-auto container-px flex items-center justify-between h-20">
        <NavLink
          to="/"
          className="font-display text-lg font-semibold tracking-tight text-ink hover:text-accent-dark transition-colors"
          aria-label="Tesseract"
        >
          Tesseract
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `nav-link-fx text-sm ${
                  isActive ? 'nav-link-fx-active text-accent font-medium' : 'text-ink-soft hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/contact"
          className="hidden md:inline-flex items-center rounded-full cta-primary-fx text-bg text-sm font-medium px-5 py-2.5"
        >
          Nous contacter
        </NavLink>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-bg border-t border-line px-6 py-4 flex flex-col gap-4">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className="text-base text-ink-soft"
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="inline-flex justify-center rounded-full bg-ink text-bg text-sm font-medium px-5 py-3"
          >
            Nous contacter
          </NavLink>
        </nav>
      )}
    </header>
  )
}
