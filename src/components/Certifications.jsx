import { motion } from 'framer-motion'

export default function Certifications() {
  const certifications = [
    {
      name: 'Artificial Intelligence Fundamentals',
      issuer: 'IBM',
      date: '2024',
      icon: '🤖',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Generative AI in Action',
      issuer: 'IBM',
      date: '2024',
      icon: '✨',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Python Programming',
      issuer: 'HCL GUVI',
      date: '2023',
      icon: '🐍',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  return (
    <section id="certifications" className="min-h-screen py-10 px-6 md:px-20 relative overflow-hidden">
      {/* Background elements consistent with other sections */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
          Certifications
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

            <div className="relative h-full p-6 flex flex-col items-center text-center hover:bg-white/5 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg bg-gray-900 border border-gray-800 group-hover:scale-110 transition-transform duration-300">
                {cert.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {cert.name}
              </h3>

              <p className="text-gray-400 font-medium mb-4 text-sm">
                {cert.issuer}
              </p>

              <div className="mt-auto w-full flex justify-center items-center text-sm text-gray-500">
                <span>{cert.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}