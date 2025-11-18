import { useEffect, useState } from 'react'

function Events() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('community')
  const [events, setEvents] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadEvents = async () => {
    const res = await fetch(`${base}/events`)
    const data = await res.json()
    setEvents(data)
  }

  useEffect(() => { loadEvents() }, [])

  const create = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`${base}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, description, category,
          latitude: 0, longitude: 0,
        }),
      })
      if (!res.ok) throw new Error('Failed to create')
      setTitle(''); setDescription('');
      await loadEvents()
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg">Organize a community event</h3>
          <form onSubmit={create} className="mt-4 space-y-3">
            <input className="w-full bg-slate-900/60 text-white border border-white/10 rounded-lg px-3 py-2" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input className="w-full bg-slate-900/60 text-white border border-white/10 rounded-lg px-3 py-2" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
            <select className="w-full bg-slate-900/60 text-white border border-white/10 rounded-lg px-3 py-2" value={category} onChange={(e)=>setCategory(e.target.value)}>
              <option value="community">Community</option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              <option value="food">Food</option>
            </select>
            <button disabled={submitting} className="h-10 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold">
              {submitting ? 'Creating...' : 'Create Event'}
            </button>
          </form>
        </div>
        <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg mb-3">Upcoming community events</h3>
          <div className="space-y-3">
            {events.map(e => (
              <div key={e.id} className="bg-slate-900/60 border border-white/10 rounded-xl p-4 text-white">
                <div className="text-sm text-blue-200/80">{e.category}</div>
                <div className="font-semibold text-lg">{e.title}</div>
                {e.description && <div className="text-blue-100/90">{e.description}</div>}
              </div>
            ))}
            {!events.length && <p className="text-blue-200/80">No events yet — be the first to organize one!</p>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Events
