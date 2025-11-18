import { useEffect, useState } from 'react'

function Alerts() {
  const [coords, setCoords] = useState(null)
  const [alerts, setAlerts] = useState([])
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

  useEffect(() => {
    const run = async () => {
      if (!coords) return
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const params = new URLSearchParams({ lat: String(coords.lat), lon: String(coords.lon) })
        const res = await fetch(`${base}/alerts?${params.toString()}`)
        if (!res.ok) throw new Error('Failed to fetch alerts')
        const data = await res.json()
        setAlerts(data.alerts)
      } catch (e) {
        setError(e.message)
      }
    }
    run()
  }, [coords])

  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
        <h3 className="text-white font-semibold text-lg mb-3">Safety alerts near you</h3>
        <div className="space-y-3">
          {alerts.map((a, i) => (
            <div key={i} className="bg-slate-900/60 border border-white/10 rounded-xl p-4 text-white">
              <div className="text-sm text-blue-200/80 uppercase">{a.type}</div>
              <div className="font-semibold">{a.message}</div>
              <div className="text-xs text-blue-300/80 mt-1">Source: {a.source}</div>
            </div>
          ))}
          {!alerts.length && !error && (
            <p className="text-blue-200/80">No alerts available. Allow location access to see nearby notices.</p>
          )}
          {error && <p className="text-red-400">{error}</p>}
        </div>
      </div>
    </section>
  )
}

export default Alerts
