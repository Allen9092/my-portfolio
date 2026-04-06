import { motion } from 'framer-motion'

export default function Skills() {
  const skillCategories = [
    {
      title: "AI & Machine Learning",
      skills: ["Machine Learning", "Deep Learning", "Generative AI", "NLP", "OpenCV", "TensorFlow", "PyTorch"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Languages",
      skills: ["Python", "SQL", "JavaScript", "C++"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Tools & Cloud",
      skills: ["Git", "Azure", "Docker", "PostgreSQL", "Prometheus", "Kubernetes"],
      color: "from-green-500 to-emerald-500"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  }

  return (
    <section id="skills" className="relative min-h-screen py-10 px-6 md:px-20 overflow-hidden bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={categoryVariants}
              className="transition-all duration-300 relative group"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className={`inline-block w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-gray-300 text-sm font-medium hover:border-gray-600 hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
