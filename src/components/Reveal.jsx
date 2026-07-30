import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fait apparaître ses enfants (fade + translate) quand ils entrent dans le viewport.
 * `stagger` anime les enfants directs en cascade au lieu du bloc entier.
 * `staggerStep` contrôle l'intervalle entre deux enfants.
 */
export default function Reveal({ children, className = '', stagger = false, delay = 0, y = 28, staggerStep = 0.12 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = stagger ? gsap.utils.toArray(el.children) : el

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          stagger: stagger ? staggerStep : 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [stagger, delay, y, staggerStep])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
