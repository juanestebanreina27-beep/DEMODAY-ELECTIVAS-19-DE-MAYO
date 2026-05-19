import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, PartyPopper } from 'lucide-react';
import { useAudioController } from '../hooks/useAudioController';
import { AUDIO_PATHS, AUDIO_VOLUMES, PROJECTS } from '../data/content';

export default function ScreenWinner() {
  const [revealed, setRevealed] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | ''>('');
  const { play } = useAudioController();

  const handleReveal = () => {
    if (selectedProjectId === '') return;
    setRevealed(true);
    play(AUDIO_PATHS.winnerReveal, { volume: AUDIO_VOLUMES.winnerReveal });
  };

  return (
    <section
      className="screen-section flex items-center justify-center relative overflow-hidden"
      id="screen-winner"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8F0 50%, #FFFFFF 100%)' }}
    >
      {/* Intense glow effects */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242,93,7,0.12) 0%, rgba(242,140,15,0.06) 40%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242,93,7,0.08) 0%, transparent 60%)',
          top: '30%',
          right: '10%',
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242,117,7,0.06) 0%, transparent 60%)',
          bottom: '20%',
          left: '15%',
        }}
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Giant watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-giant-fill select-none pointer-events-none">
        GANADOR
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        {/* Trophy icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-primary to-orange-intense flex items-center justify-center shadow-xl shadow-orange-intense/30 glow-orange-intense">
            <Trophy size={36} className="text-white" />
          </div>
        </motion.div>

        {/* Expectation label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-orange text-sm font-bold text-orange-primary uppercase tracking-widest">
            <Sparkles size={14} />
            Y EL EQUIPO GANADOR ES...
          </span>
        </motion.div>

        {/* Reveal area */}
        <div className="mt-10 mb-8 min-h-[120px] flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div
                key="reveal-controls"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col items-center gap-6 w-full max-w-md"
              >
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(Number(e.target.value))}
                  className="w-full px-5 py-4 rounded-xl bg-white/90 border-2 border-orange-primary/30 text-text-dark font-semibold text-lg focus:outline-none focus:border-orange-primary focus:ring-4 focus:ring-orange-primary/20 shadow-sm transition-all text-center appearance-none cursor-pointer"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\\\'http://www.w3.org/2000/svg\\\' fill=\\\'none\\\' viewBox=\\\'0 0 24 24\\\' stroke=\\\'%23F25D07\\\'%3E%3Cpath stroke-linecap=\\\'round\\\' stroke-linejoin=\\\'round\\\' stroke-width=\\\'2\\\' d=\\\'M19 9l-7 7-7-7\\\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em 1.5em' }}
                >
                  <option value="" disabled>Seleccionar Proyecto Ganador...</option>
                  {PROJECTS.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>

                <motion.button
                  whileHover={selectedProjectId !== '' ? { scale: 1.05, boxShadow: '0 20px 60px rgba(242, 93, 7, 0.35)' } : {}}
                  whileTap={selectedProjectId !== '' ? { scale: 0.95 } : {}}
                  onClick={handleReveal}
                  disabled={selectedProjectId === ''}
                  className={`relative group px-12 py-4 rounded-2xl text-white text-xl font-bold overflow-hidden transition-all duration-300 w-full flex justify-center ${
                    selectedProjectId === '' 
                      ? 'bg-gray-300 cursor-not-allowed opacity-70' 
                      : 'bg-gradient-to-r from-orange-primary via-orange-mid to-orange-intense shadow-xl shadow-orange-primary/30'
                  }`}
                >
                  {selectedProjectId !== '' && (
                    <span className="absolute inset-0 bg-white/15 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                  )}
                  <span className="relative z-10 flex items-center gap-3">
                    <PartyPopper size={24} />
                    Revelar Ganador
                  </span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="winner-name"
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-center w-full"
              >
                {(() => {
                  const winner = PROJECTS.find(p => p.id === selectedProjectId);
                  return (
                    <>
                      <div
                        className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-orange-primary via-orange-mid to-orange-intense bg-clip-text text-transparent glow-text-orange animate-pulse-glow rounded-2xl p-2 md:p-4 mb-2 leading-tight"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {winner?.name}
                      </div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="flex flex-wrap justify-center gap-2 md:gap-3 mt-8 max-w-4xl mx-auto"
                      >
                        {winner?.members.map((m, idx) => (
                          <span key={idx} className="px-5 py-2.5 bg-white border border-orange-primary/20 rounded-full text-sm md:text-base font-semibold text-text-dark shadow-sm hover:border-orange-primary/50 transition-colors">
                            {m.name}
                          </span>
                        ))}
                      </motion.div>
                    </>
                  );
                })()}

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="mt-10 text-text-mid text-base md:text-lg font-medium"
                >
                  🎉 ¡Felicitaciones al equipo ganador del Demo Day!
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-40 h-0.5 rounded-full bg-gradient-to-r from-transparent via-orange-primary/30 to-transparent mb-8"
        />

        {/* Thank you */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="text-6xl md:text-8xl font-bold text-text-dark tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          MUCHAS{' '}
          <span className="bg-gradient-to-r from-orange-primary to-orange-intense bg-clip-text text-transparent">
            GRACIAS
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="mt-4 text-text-mid text-sm"
        >
          Demo Day — Proyectos de Emprendimiento UEB · Universidad El Bosque
        </motion.p>
      </div>
    </section>
  );
}
