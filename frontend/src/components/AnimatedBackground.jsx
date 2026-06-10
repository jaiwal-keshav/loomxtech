// Decorative animated background: faint grid + drifting aurora blobs.
// Pure CSS animation — no JS cost on scroll.
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
      {/* faint grid */}
      <div className="absolute inset-0 grid-overlay [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      {/* aurora blobs */}
      <div className="aurora animate-float h-[42vw] w-[42vw] -left-[10vw] -top-[10vw] bg-neon-cyan/30" />
      <div
        className="aurora animate-float h-[38vw] w-[38vw] right-[-8vw] top-[20vh] bg-neon-violet/30"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="aurora animate-pulse-slow h-[30vw] w-[30vw] left-[30vw] top-[60vh] bg-neon-blue/20"
        style={{ animationDelay: '1s' }}
      />
      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
    </div>
  )
}
