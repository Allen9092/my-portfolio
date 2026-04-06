import { motion } from 'framer-motion'

export default function Education() {
    const education = [
        {
            degree: 'B.Tech in Artificial Intelligence & Data Science',
            institution: 'Suguna College of Engineering',
            period: '2023 - 2027',
            status: '3rd Year',
            description: 'Currently pursuing a Bachelor of Technology degree with a specialization in AI and Data Science. Gaining a strong foundation in machine learning, deep learning, and data analysis.',
        }
    ]

    return (
        <section id="education" className="min-h-screen py-10 px-6 md:px-20 relative">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-16 text-center"
            >
                Education
            </motion.h2>

            <div className="max-w-4xl mx-auto space-y-12">
                {education.map((edu, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <div className="relative z-10 border-l-2 border-purple-500/30 pl-8 ml-4">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{edu.institution}</h3>
                                    <p className="text-lg text-gray-400 mt-1">{edu.degree}</p>
                                </div>
                                <div className="text-right mt-2 md:mt-0">
                                    <span className="block text-sm text-gray-400 font-mono">
                                        {edu.period}
                                    </span>
                                    <span className="block text-xs text-purple-400 mt-1 uppercase tracking-wider">{edu.status}</span>
                                </div>
                            </div>

                            <p className="text-gray-300 leading-relaxed">
                                {edu.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div></section >
    )
}
