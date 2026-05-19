import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Music, Timer, MessageSquare, VolumeX, Pause } from 'lucide-react';
import { useAudioController, stopAllAudio } from '../../hooks/useAudioController';
import { AUDIO_PATHS, AUDIO_VOLUMES } from '../../data/content';

type ConsoleState = 'idle' | 'walkup' | 'pitch' | 'timesup' | 'feedback' | 'feedback-done';

interface PitchConsoleProps {
  groupNumber: number;
  entradaAudio: string;
}

export default function PitchConsole({ groupNumber, entradaAudio }: PitchConsoleProps) {
  const [state, setState] = useState<ConsoleState>('idle');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [feedbackTime, setFeedbackTime] = useState(300);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const walkupAudio = useAudioController();
  const pitchAudio = useAudioController();
  const sfxAudio = useAudioController();
  const feedbackAudioCtrl = useAudioController();

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Walk-up: Play entrada audio
  const handleWalkup = useCallback(() => {
    setState('walkup');
    walkupAudio.play(entradaAudio, { loop: false, volume: AUDIO_VOLUMES.walkup });
  }, [entradaAudio, walkupAudio]);

  // Start Pitch: 5-min countdown + background music loop
  const handleStartPitch = useCallback(() => {
    clearTimer();
    setState('pitch');
    setTimeLeft(300);
    pitchAudio.play(AUDIO_PATHS.pitchLoop, { loop: true, volume: AUDIO_VOLUMES.pitchLoop });

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setState('timesup');
          pitchAudio.stop();
          sfxAudio.play(AUDIO_PATHS.sfxTimesUp, { loop: false, volume: AUDIO_VOLUMES.sfxTimesUp });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer, pitchAudio, sfxAudio]);

  // Start Feedback: 5-min countdown + deliberation music
  const handleStartFeedback = useCallback(() => {
    clearTimer();
    setState('feedback');
    setFeedbackTime(300);
    feedbackAudioCtrl.play(AUDIO_PATHS.deliberationLoop, { loop: true, volume: AUDIO_VOLUMES.deliberationLoop });

    timerRef.current = setInterval(() => {
      setFeedbackTime((prev) => {
        if (prev <= 1) {
          clearTimer();
          feedbackAudioCtrl.stop();
          setState('feedback-done');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer, feedbackAudioCtrl]);

  // Mute all
  const handleMuteAll = useCallback(() => {
    stopAllAudio();
    setIsMuted(true);
    setTimeout(() => setIsMuted(false), 2000);
  }, []);

  // Reset
  const handleReset = useCallback(() => {
    clearTimer();
    stopAllAudio();
    setState('idle');
    setTimeLeft(300);
    setFeedbackTime(300);
  }, [clearTimer]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isTimesUp = state === 'timesup';
  const isPitch = state === 'pitch';
  const isFeedback = state === 'feedback';
  const isWalkup = state === 'walkup';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={`
        glass-strong rounded-2xl p-5 w-full max-w-[520px]
        transition-all duration-500
        ${isTimesUp ? 'animate-pulse-glow !border-orange-intense' : ''}
      `}
      style={isTimesUp ? { borderColor: '#F25D07' } : {}}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-primary animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-text-mid" style={{ fontFamily: 'var(--font-mono)' }}>
            Consola — Grupo {groupNumber}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleMuteAll}
            className={`p-1.5 rounded-lg transition-all duration-300 hover:bg-red-50 ${isMuted ? 'text-red-500' : 'text-text-light hover:text-red-500'}`}
            title="Silenciar Todo"
          >
            <VolumeX size={16} />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-text-light hover:text-text-dark hover:bg-gray-100 transition-all duration-300"
            title="Reset"
          >
            <Square size={14} />
          </button>
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-center mb-4">
        <AnimatePresence mode="wait">
          {(isPitch || isTimesUp) && (
            <motion.div
              key="pitch-timer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative"
            >
              <div
                className={`text-5xl font-bold tracking-tight ${isTimesUp ? 'text-orange-intense glow-text-orange' : 'text-text-dark'}`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {formatTime(timeLeft)}
              </div>
              <div className="text-xs text-text-light mt-1 uppercase tracking-wider">
                {isTimesUp ? '⚡ Tiempo Finalizado' : 'Pitch en Curso'}
              </div>
              {/* Progress bar */}
              <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: isTimesUp
                      ? '#F25D07'
                      : 'linear-gradient(90deg, #F28C0F, #F27507)',
                  }}
                  animate={{ width: `${((300 - timeLeft) / 300) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}
          {isFeedback && (
            <motion.div
              key="feedback-timer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div
                className="text-5xl font-bold tracking-tight text-green-ueb"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {formatTime(feedbackTime)}
              </div>
              <div className="text-xs text-text-light mt-1 uppercase tracking-wider">
                Deliberación & Feedback
              </div>
              <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-green-ueb/70"
                  animate={{ width: `${((300 - feedbackTime) / 300) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}
          {(state === 'idle' || isWalkup || state === 'feedback-done') && (
            <motion.div
              key="idle-display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="text-5xl font-bold text-text-dark/20 tracking-tight"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                05:00
              </div>
              <div className="text-xs text-text-light mt-1 uppercase tracking-wider">
                {isWalkup ? '🎵 Entrada al escenario...' : state === 'feedback-done' ? '✅ Sesión Completa' : 'Esperando inicio'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Audio Active Indicator (Equalizer) */}
      <AnimatePresence>
        {(isWalkup || isPitch || isFeedback) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-center gap-1 mb-3 py-2"
          >
            <Music size={12} className="text-orange-primary mr-2" />
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-1 rounded-full bg-orange-primary eq-bar-${i}`}
                style={{ height: '16px' }}
              />
            ))}
            <span className="text-[10px] text-text-light ml-2 uppercase tracking-wider">
              Audio activo
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex gap-2 flex-wrap">
        {state === 'idle' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWalkup}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-primary to-orange-mid text-white text-sm font-semibold shadow-lg shadow-orange-primary/20 hover:shadow-orange-primary/40 transition-shadow"
          >
            <Music size={16} />
            Play Entrada
          </motion.button>
        )}

        {(state === 'idle' || isWalkup) && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartPitch}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-text-dark text-white text-sm font-semibold shadow-lg hover:bg-gray-800 transition-colors"
          >
            <Play size={16} />
            Start Pitch
          </motion.button>
        )}

        {isTimesUp && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartFeedback}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-ueb text-white text-sm font-semibold shadow-lg shadow-green-ueb/20 hover:shadow-green-ueb/40 transition-shadow"
          >
            <MessageSquare size={16} />
            Start Feedback
          </motion.button>
        )}

        {isPitch && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              clearTimer();
              pitchAudio.stop();
              setState('timesup');
              sfxAudio.play(AUDIO_PATHS.sfxTimesUp, { loop: false, volume: AUDIO_VOLUMES.sfxTimesUp });
              setTimeLeft(0);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-intense text-white text-sm font-semibold shadow-lg"
          >
            <Pause size={16} />
            Finalizar Pitch
          </motion.button>
        )}

        {isFeedback && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              clearTimer();
              feedbackAudioCtrl.stop();
              setState('feedback-done');
              setFeedbackTime(0);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-green-ueb text-green-ueb text-sm font-semibold hover:bg-green-ueb/5 transition-colors"
          >
            <Square size={14} />
            Finalizar Feedback
          </motion.button>
        )}

        {state === 'feedback-done' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-text-mid text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            <Timer size={14} />
            Reiniciar Consola
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
