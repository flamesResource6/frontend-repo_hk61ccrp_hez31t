import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/40 to-slate-900 pointer-events-none" />

      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-blue-200/80 bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-4 backdrop-blur-sm">Local Events • Weather-aware • Community</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            Discover what's happening around you
          </h1>
          <p className="mt-4 text-base md:text-lg text-blue-100/90">
            Smart suggestions based on your interests, location, and weather. Share recommendations, organize community meetups, and stay informed with safety alerts.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
