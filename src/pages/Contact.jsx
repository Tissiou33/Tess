import { useState } from 'react'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: brancher sur Firebase / un service d'envoi d'e-mail (EmailJS, Formspree, etc.)
    setSent(true)
  }

  return (
    <div className="pt-40 pb-28">
      <div className="max-w-content mx-auto container-px grid md:grid-cols-[1fr_1.3fr] gap-16">
        <Reveal>
          <span className="eyebrow">Contact</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            Parlons de votre projet.
          </h1>
          <p className="mt-5 text-ink-soft leading-relaxed max-w-sm">
            Une idée à cadrer, un système à sécuriser, un volume de données à
            analyser, écrivez-nous, on revient vers vous rapidement.
          </p>

          <div className="mt-10 space-y-4">
            <a href="mailto:contact@tesseract.tg" className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
              <Mail size={16} className="text-accent" /> contact@tesseract.tg
            </a>
            <div className="flex items-center gap-3 text-sm text-ink-soft">
              <MapPin size={16} className="text-accent" /> Lomé, Togo
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {sent ? (
            <div className="rounded-2xl border border-line bg-surface p-10 text-center">
              <h2 className="font-display text-xl font-medium">Message envoyé.</h2>
              <p className="mt-2 text-sm text-ink-soft">
                Merci! Nous revenons vers vous très vite.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-surface p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Nom" name="name" placeholder="Votre nom" />
                <Field label="E-mail" name="email" type="email" placeholder="vous@exemple.com" />
              </div>
              <Field label="Société" name="company" placeholder="Nom de votre société (optionnel)" required={false} />
              <div>
                <label className="text-sm font-medium" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Décrivez votre projet en quelques lignes..."
                  className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm focus:border-accent outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-ink text-bg text-sm font-medium px-6 py-3.5 hover:bg-accent transition-colors"
              >
                Envoyer <ArrowUpRight size={16} />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </div>
  )
}

function Field({ label, name, type = 'text', placeholder, required = true }) {
  return (
    <div>
      <label className="text-sm font-medium" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm focus:border-accent outline-none transition-colors"
      />
    </div>
  )
}
