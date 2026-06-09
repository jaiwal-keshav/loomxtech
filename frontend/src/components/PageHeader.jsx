import { motion } from 'framer-motion'

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="container-x pt-16 pb-8 text-center">
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="chip"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400"
        >
          {subtitle}
        </motion.p>
      )}
    </section>
  )
}
