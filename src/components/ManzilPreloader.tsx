import React, { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MANZIL_LOGO_URL } from '../data/manzilData';

interface ManzilPreloaderProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const ManzilPreloader: React.FC<ManzilPreloaderProps> = ({
  isVisible,
  onComplete,
}) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible) return;
    const duration = prefersReducedMotion ? 550 : 2100;
    const timer = window.setTimeout(() => {
      onComplete();
    }, duration);
    return () => window.clearTimeout(timer);
  }, [isVisible, onComplete, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="manzil-preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading Manzil Property Management"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 1.03,
            transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
          }}
          className="absolute inset-0 z-50 flex flex-col justify-between bg-gradient-to-b from-[#FAF9FC] via-[#F6F4FA] to-[#EFEBF6] select-none overflow-hidden"
        >
          {/* Ambient radial glow using official Manzil logo tints */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0.35, scale: 0.9 }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.55, scale: 1 }
                : {
                    opacity: [0.35, 0.65, 0.45],
                    scale: [0.92, 1.08, 1],
                  }
            }
            transition={{
              duration: 2.2,
              ease: [0.16, 1, 0.3, 1],
              repeat: prefersReducedMotion ? 0 : Infinity,
              repeatType: 'mirror',
            }}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-[radial-gradient(circle,rgba(130,116,164,0.22)_0%,rgba(69,49,120,0.08)_46%,transparent_72%)]"
          />

          {/* Top iPhone Safe Area Status & Dynamic Island */}
          <div className="relative z-10 pt-3 px-7 flex items-center justify-between text-[13px] font-semibold tracking-tight text-[#1F1738]">
            <span className="tabular-nums">9:41</span>
            <div
              className="w-[116px] h-[30px] rounded-full bg-[#1F1738]"
              aria-hidden="true"
            />
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <div className="flex items-end gap-[2px] h-3">
                <span className="w-[2.5px] h-1.5 rounded-full bg-[#1F1738]" />
                <span className="w-[2.5px] h-2 rounded-full bg-[#1F1738]" />
                <span className="w-[2.5px] h-2.5 rounded-full bg-[#1F1738]" />
                <span className="w-[2.5px] h-3 rounded-full bg-[#1F1738]" />
              </div>
              <div className="w-5 h-2.5 rounded-[3px] border border-[#1F1738] p-[1.5px] flex items-center">
                <div className="w-full h-full rounded-[1px] bg-[#1F1738]" />
              </div>
            </div>
          </div>

          {/* Centered Animated Manzil Logo Stage */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
            <div className="relative flex items-center justify-center">
              {/* Outer Breathing Architectural Ring */}
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.84 }}
                animate={
                  prefersReducedMotion
                    ? { opacity: 0.6, scale: 1 }
                    : {
                        opacity: [0, 0.7, 0.35],
                        scale: [0.84, 1.06, 1.12],
                      }
                }
                transition={{
                  duration: 1.9,
                  ease: [0.16, 1, 0.3, 1],
                  repeat: prefersReducedMotion ? 0 : Infinity,
                }}
                className="absolute w-[236px] h-[236px] rounded-full border border-[#8274A4]/30"
              />

              {/* Rotating Fine Orbital Arc */}
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, rotate: 0 }}
                animate={
                  prefersReducedMotion
                    ? { opacity: 0.6 }
                    : { opacity: 0.85, rotate: 360 }
                }
                transition={{
                  opacity: { duration: 0.45 },
                  rotate: {
                    duration: 3.6,
                    ease: 'linear',
                    repeat: prefersReducedMotion ? 0 : Infinity,
                  },
                }}
                className="absolute w-[212px] h-[212px] rounded-full border-[1.5px] border-transparent border-t-[#453178]/45 border-r-[#8274A4]/35"
              />

              {/* Elevated White Crest Card Holding Unmodified Official Manzil Logo */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : 16,
                  scale: prefersReducedMotion ? 1 : 0.9,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative w-[176px] h-[176px] rounded-[36px] bg-white border border-[#E5E1EE] shadow-[0_24px_56px_-16px_rgba(69,49,120,0.22)] flex items-center justify-center p-6 overflow-hidden"
              >
                <motion.img
                  src={MANZIL_LOGO_URL}
                  alt="Manzil"
                  referrerPolicy="no-referrer"
                  initial={{ scale: prefersReducedMotion ? 1 : 0.94 }}
                  animate={
                    prefersReducedMotion
                      ? { scale: 1 }
                      : { scale: [0.94, 1.02, 1] }
                  }
                  transition={{
                    duration: 1.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative z-10 w-full h-full object-contain"
                />

                {/* Subtle Diagonal Light Sheen Sweep */}
                {!prefersReducedMotion && (
                  <motion.div
                    aria-hidden="true"
                    initial={{ x: '-160%' }}
                    animate={{ x: '220%' }}
                    transition={{
                      duration: 1.15,
                      delay: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="pointer-events-none absolute inset-y-[-25%] w-16 bg-gradient-to-r from-transparent via-white/75 to-transparent rotate-18 z-20"
                  />
                )}
              </motion.div>
            </div>

            {/* Brand Descriptor + Smooth Compositor Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: prefersReducedMotion ? 0 : 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-8 flex flex-col items-center gap-3.5"
            >
              <p className="font-display text-[15px] font-semibold tracking-tight text-[#1F1738]">
                Property Management
              </p>

              <div
                aria-hidden="true"
                className="w-36 h-[4px] rounded-full bg-[#E5DFF0] overflow-hidden"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.4 : 1.7,
                    delay: prefersReducedMotion ? 0 : 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full h-full origin-left rounded-full bg-gradient-to-r from-[#453178] to-[#8274A4]"
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom iPhone Home Indicator */}
          <div className="relative z-10 pb-3 flex justify-center" aria-hidden="true">
            <div className="w-[134px] h-[5px] rounded-full bg-[#453178]/25" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
