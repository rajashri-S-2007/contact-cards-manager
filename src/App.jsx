import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [contacts, setContacts] = useState(() => {
  const savedContacts = localStorage.getItem('contacts')
  return savedContacts ? JSON.parse(savedContacts) : []
})
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({
    name: '',
    job: '',
    company: '',
    phone: '',
    email: '',
    bio: '',
  })

useEffect(() => {
  localStorage.setItem('contacts', JSON.stringify(contacts))
}, [contacts])

  
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function deleteContact(id) {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }


  function addContact(event) {
    event.preventDefault()
    setContacts([...contacts, { ...form, id: Date.now() }])
    setForm({
      name: '',
      job: '',
      company: '',
      phone: '',
      email: '',
      bio: '',
    })
  }

  const filteredContacts = contacts.filter((contact) =>
    `${contact.name} ${contact.company}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <main className="app">
      <header className="header">
        <div className="brand">People<span>Hub.</span></div>
        <p>YOUR PERSONAL CONTACT MANAGER</p>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">YOUR NETWORK, ORGANIZED</p>
          <h1>Every connection<br />starts with a hello.</h1>
          <p className="subtitle">
            Keep all your important people in one beautiful place.
          </p>
        </div>
        <div className="hero-icon">👥</div>
      </section>

      <section className="content">
        <div className="form-panel">
          <h2>＋ Add a contact</h2>
          <p className="muted">Build your personal network.</p>

          <form onSubmit={addContact}>
            <label>Full name *</label>
            <input name="name" value={form.name} onChange={handleChange}
              placeholder="e.g. Priya Sharma" required />

            <label>Job title</label>
            <input name="job" value={form.job} onChange={handleChange}
              placeholder="e.g. UI Designer" />

            <label>Company</label>
            <input name="company" value={form.company} onChange={handleChange}
              placeholder="e.g. Creative Studio" />

            <label>Email address *</label>
            <input name="email" type="email" value={form.email}
              onChange={handleChange} placeholder="name@example.com" required />

            <label>Phone number</label>
            <input name="phone" value={form.phone} onChange={handleChange}
              placeholder="+91 98765 43210" />

            <label>Short bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange}
              placeholder="A little about this person..." rows="3" />

            <button className="add-button" type="submit">＋ Save contact</button>
          </form>
        </div>

        <div className="contacts-panel">
          <div className="contacts-heading">
            <div>
              <h2>Your contacts</h2>
              <p className="muted">{contacts.length} people in your network</p>
            </div>
          </div>

          <input className="search" value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="⌕  Search by name or company..." />

          <div className="contact-grid">
            {filteredContacts.map((contact) => (
              <article className="contact-card" key={contact.id}>
                <div className="avatar">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <h3>{contact.name}</h3>
                <p className="job">{contact.job || 'Professional'}</p>
                {contact.company && <p className="company">{contact.company}</p>}
                {contact.email && <p className="detail">✉ {contact.email}</p>}
                {contact.phone && <p className="detail">☎ {contact.phone}</p>}
                {contact.bio && <p className="bio">{contact.bio}</p>}

  <button
    className="delete-button"
    onClick={() => deleteContact(contact.id)}
  >
    Delete Contact
  </button>

              </article>
            ))}

            {filteredContacts.length === 0 && (
              <div className="empty">
                <div>📇</div>
                <h3>{search ? 'No contacts found' : 'Your network starts here'}</h3>
                <p>{search ? 'Try another name or company.' : 'Add your first contact using the form.'}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer>PeopleHub · Made to keep you connected.</footer>
    </main>
  )
}



export default App