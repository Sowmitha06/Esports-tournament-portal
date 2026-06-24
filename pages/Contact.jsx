import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) {
      e.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email address.'
    }
    if (!form.message.trim()) e.message = 'Message is required.'
    else if (form.message.trim().length < 10) e.message = 'Message should be at least 10 characters.'
    return e
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      const messages = JSON.parse(localStorage.getItem('na_contact_messages') || '[]')
      messages.push({ ...form, date: new Date().toISOString() })
      localStorage.setItem('na_contact_messages', JSON.stringify(messages))
      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    }
  }

  return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 560 }}>
        <div className="page-header fade-up" style={{ textAlign: 'center' }}>
          <h1>Contact Us</h1>
          <p>Have a question about a tournament or your team? Reach out.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-strong card fade-up">
          <div className="field">
            <label>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          <div className="field">
            <label>Email</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="field">
            <label>Message</label>
            <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us how we can help..." />
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>
          {sent && <p className="success-banner" style={{ marginBottom: '1rem' }}>Message sent! We'll get back to you soon.</p>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
        </form>
      </div>
    </div>
  )
}
