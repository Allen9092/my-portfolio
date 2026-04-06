import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} className="fixed w-full z-50 backdrop-blur-lg bg-black/30 flex justify-center px-10 py-4">
      <div className="space-x-6">
        <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
        <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
        <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
        <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
        <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
        <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
      </div>
    </motion.nav>
  )
}