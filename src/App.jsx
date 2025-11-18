import Hero from './components/Hero'
import Suggestions from './components/Suggestions'
import Events from './components/Events'
import Alerts from './components/Alerts'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <Hero />
      <Suggestions />
      <Events />
      <Alerts />
      <footer className="py-10 text-center text-blue-200/70">
        Built for discovering the best of your neighborhood.
      </footer>
    </div>
  )
}

export default App
