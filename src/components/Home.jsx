import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Home() {
    const socialLinks = [
        { icon: <FaGithub />, href: 'https://github.com/Allen9092', label: 'GitHub' },
        { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
        { icon: <FaEnvelope />, href: 'mailto:allenjwessley@gmail.com', label: 'Email' }
    ]

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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    }

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Consistent Background Orbs */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]"
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 text-center px-6"
            >
                <motion.h1 variants={itemVariants} className="text-7x md:text-9xl font-bold mb-4 text-white tracking-tighter">
                    Allen J Wessley
                </motion.h1>

                <motion.p variants={itemVariants} className="text-2xl md:text-4xl text-cyan-400 font-medium mb-12 flex items-center justify-center gap-3">
                    AI Student <span className="text-slate-700 font-light prose">•</span> Developer
                </motion.p>

                {/* Social Links */}
                <motion.div variants={itemVariants} className="flex justify-center gap-6 mb-12">
                    {socialLinks.map((link, iconIdx) => (
                        <motion.a
                            key={iconIdx}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, color: '#22d3ee' }}
                            className="text-2xl text-slate-500 transition-colors"
                            aria-label={link.label}
                        >
                            {link.icon}
                        </motion.a>
                    ))}
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="#about"
                        className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105"
                    >
                        About Me
                    </a>
                    <a
                        href="#projects"
                        className="px-8 py-4 border border-slate-700 text-white font-bold rounded-full hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
                    >
                        Projects
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-2"
                >
                    <div className="w-1 h-2 bg-cyan-400 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    )
}
