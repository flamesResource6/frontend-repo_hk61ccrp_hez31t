import { useEffect, useState } from 'react'

function Suggestions() {
  const [coords, setCoords] = useState(null)
  const [weather, setWeather] = useState('')
  const [interests, setInterests] = useState('music,food,outdoors')
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => setError('Location access denied')
      )
    } else {
      setError('Geolocation not supported')
    }
  }, [])

  const fetchSuggestions = async () => {
    if (!coords) return
    setLoading(true)
    setError('')
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const params = new URLSearchParams({
        lat: String(coords.lat),
        lon: String(coords.lon),
        interests,
        weather,
      })
      const res = await fetch(`${base}/suggestions?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch suggestions')
      const data = await res.json()
      setSuggestions(data.suggestions)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (coords) fetchSuggestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords])

  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6 backdrop-blur">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm text-blue-200/80 mb-2">Your interests</label>
            <input
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full bg-slate-900/60 text-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="e.g. music, food, outdoors"
            />
          </div>
          <div className="md:w-48">
            <label className="block text-sm text-blue-200/80 mb-2">Weather</label>
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full bg-slate-900/60 text-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="">Auto/Unknown</option>
              <option value="sunny">Sunny</option>
              <option value="rainy">Rainy</option>
            </select>
          </div>
          <button
            onClick={fetchSuggestions}
            className="md:w-40 h-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
            disabled={!coords || loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map((s, i) => (
            <div key={i} className="bg-slate-900/60 border border-white/10 rounded-xl p-4 text-white">
              <div className="text-sm text-blue-200/80">{s.category}</div>
              <div className="font-semibold text-lg">{s.title}</div>
              <div className="text-xs text-blue-300/70 mt-1">score {s.score}</div>
            </div>
          ))}
        </div>

        {!suggestions.length && !loading && (
          <p className="mt-6 text-blue-200/80">No suggestions yet. Allow location access or adjust filters.</p>
        )}

        {error && <p className="mt-4 text-red-400">{error}</p>}
      </div>
    </section>
  )
}

export default Suggestions
