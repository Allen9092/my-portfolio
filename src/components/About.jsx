import { motion } from 'framer-motion'
import { FaGraduationCap, FaBriefcase, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'

export default function About() {
  const profileImage = '/profile-photo.jpg'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  const details = [
    {
      icon: <FaGraduationCap className="text-cyan-400" />,
      title: "B.Tech AI & Data Science — Suguna College of Engineering",
      subtitle: "2023 - Present"
    },
    {
      icon: <FaBriefcase className="text-cyan-400" />,
      title: "Intern — Lysa Solutions",
      subtitle: "AI Question Generation Module"
    },
    {
      icon: <FaMapMarkerAlt className="text-cyan-400" />,
      title: "Coimbatore, India",
      subtitle: ""
    },
    {
      icon: <FaEnvelope className="text-cyan-400" />,
      title: "allenjwessley@gmail.com",
      subtitle: ""
    },
    {
      icon: <FaPhoneAlt className="text-cyan-400" />,
      title: "9092223275",
      subtitle: ""
    }
  ]

  return (
    <section id="about" className="relative min-h-screen py-24 px-6 md:px-20 overflow-hidden bg-black">
      {/* Background Orbs (matching consistency) */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            About <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Profile Photo */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-full max-w-sm md:max-w-md aspect-[4/5] rounded-3xl border border-slate-800 bg-slate-900/50 overflow-hidden">
                <img
                  src={profileImage}
                  alt="Allen J Wessley"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.p variants={itemVariants} className="text-slate-400 text-lg leading-relaxed font-light">
              B.Tech Artificial Intelligence and Data Science student with strong skills in Python, machine learning, and data analysis. Certified in IBM AI Fundamentals and GUVI Python, with team project experience in DevOps strategies using Kubernetes and Nginx. Passionate about applying AI/ML to real-world challenges and eager to contribute to innovative projects.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-6">
              {details.map((item, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10 group-hover:border-cyan-500/40 transition-colors">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                    {item.subtitle && (
                      <p className="text-slate-500 text-sm">{item.subtitle}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
