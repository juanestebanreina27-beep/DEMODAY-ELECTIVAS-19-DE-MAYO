import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import PitchConsole from './PitchConsole/PitchConsole';
import type { PitchProject } from '../data/content';

interface PitchScreenProps {
  project: PitchProject;
  screenIndex: number;
}

export default function PitchTemplate({ project, screenIndex }: PitchScreenProps) {
  return (
    <section
      className="screen-section flex items-center justify-center relative"
      id={`screen-pitch-${project.id}`}
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 50%, #FFFFFF 100%)' }}
    >
      {/* Giant watermark project name */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none pointer-events-none px-8"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 10vw, 10rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.03em',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(26, 26, 26, 0.04)',
        }}
      >
        {project.name}
      </div>

      {/* Decorative glow orbs */}
      <motion.div
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242,140,15,0.06) 0%, transparent 70%)',
          top: '15%',
          right: '10%',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-56 h-56 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242,117,7,0.05) 0%, transparent 70%)',
          bottom: '10%',
          left: '5%',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Main content card */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
        {/* Project number badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-primary to-orange-mid text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-orange-primary/20">
            Proyecto {project.id}
          </span>
        </motion.div>

        {/* Project Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark text-center tracking-tight leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {project.name}
        </motion.h2>

        {/* Glass card with two columns: Team & Console */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-strong rounded-3xl p-6 md:p-10 w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Left column: Team members */}
          <div className="flex flex-col h-full justify-center">
            <div className="flex items-center gap-3 mb-6">
              <Users size={24} className="text-orange-primary" />
              <span className="text-sm font-bold uppercase tracking-widest text-orange-primary">
                {project.tag}
              </span>
            </div>
            <ul className="space-y-4">
              {project.members.map((member, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-4 text-base md:text-lg text-text-dark font-medium"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-primary/15 to-orange-mid/10 flex items-center justify-center text-sm font-bold text-orange-primary flex-shrink-0 shadow-sm border border-orange-primary/10">
                    {member.name.charAt(0)}
                  </div>
                  {member.name}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right column: PitchConsole */}
          <div className="flex flex-col items-center md:items-end w-full h-full justify-between">
            <div className="w-full flex justify-end">
              <PitchConsole
                groupNumber={project.id}
                entradaAudio={project.audioEntrada}
              />
            </div>
            
            {/* Project number decorative */}
            <div className="mt-8 md:mt-auto w-full text-center md:text-right">
              <span
                className="text-8xl lg:text-9xl font-bold opacity-[0.04] leading-none select-none"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                0{project.id}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
