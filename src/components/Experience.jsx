import { motion } from 'framer-motion'

export default function Experience() {
    const experiences = [
        {
            year: '2023 - 2027',
            role: 'B.Tech AI & Data Science',
            company: 'Suguna College of Engineering',
            description: 'Currently pursuing a Bachelor of Technology degree with a specialization in AI and Data Science. Gaining a strong foundation in machine learning, deep learning, and data analysis.'
        },
        {
            year: '2024',
            role: 'AI & Data Science Intern',
            company: 'Lysa Solutions Tech Company',
            description: 'Worked on ML models for predictive analytics and data pipeline optimization.'
        },
        {
            year: '2023',
            role: 'DevOps & Cloud Projects',
            company: 'Academic / Freelance',
            description: 'Implemented blue-green and canary deployment strategies using Kubernetes and Nginx.'
        }
    ]

    return (
        <section id="experience" className="min-h-screen py-24 px-6 md:px-20 relative bg-black overflow-hidden">
            {/* Consistent Background */}
            <div className="absolute inset-0 z-0 opacity-50">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                        Exper<span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">ience</span>
                    </h2>
                    <div className="h-1.5 w-24 bg-cyan-400 mx-auto mt-4 rounded-full" />
                </motion.div>

                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent opacity-30" />

                    <div className="space-y-24">
                        {experiences.map((exp, index) => (
                            <div key={index} className="relative flex items-center justify-between gap-8 md:gap-0">
                                {/* Timeline Dot */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 z-20 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                                />

                                <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:pr-12' : 'md:order-last md:pl-12'}`}>
                                    <motion.div
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, ease: 'easeOut' }}
                                        className="p-8 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 group"
                                    >
                                        <span className="text-cyan-400 font-mono text-sm font-bold tracking-widest">{exp.year}</span>
                                        <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                                            {exp.role}
                                        </h3>
                                        <p className="text-purple-400 font-medium mt-1">{exp.company}</p>
                                        <p className="text-slate-400 mt-4 leading-relaxed font-light">
                                            {exp.description}
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Spacer for other side on desktop */}
                                <div className="hidden md:block w-[45%]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
