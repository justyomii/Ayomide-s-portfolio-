"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type LetterContent = {
  label: string;
  opening: string;
  paragraphs: string[];
  signOff: string;
  track: string; // path to an optional mp3, e.g. "/letter/theme.mp3"
};

/* -------------------------------------------------------------------------- */
/*  Audio fallback — a warm string pad synthesized in the browser.             */
/*  Guaranteed to work with no asset. If the mp3 at `track` exists, that plays  */
/*  instead automatically.                                                      */
/* -------------------------------------------------------------------------- */

type SynthHandle = { stop: () => void; setMuted: (m: boolean) => void };

function startSynth(): SynthHandle {
  const AC: typeof AudioContext =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AC();

  const master = ctx.createGain();
  master.gain.value = 0.0001;
  master.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 4);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1650;
  filter.Q.value = 0.2;
  filter.connect(master);
  master.connect(ctx.destination);

  const delay = ctx.createDelay(1.0);
  delay.delayTime.value = 0.4;
  const fb = ctx.createGain();
  fb.gain.value = 0.28;
  const wet = ctx.createGain();
  wet.gain.value = 0.22;
  master.connect(delay);
  delay.connect(fb);
  fb.connect(delay);
  delay.connect(wet);
  wet.connect(ctx.destination);

  const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);
  const chords = [
    [53, 57, 60, 64],
    [50, 53, 57, 60],
    [46, 50, 53, 57],
    [48, 52, 55, 59],
  ].map((c) => c.map(midi));

  const chordDur = 6;
  let idx = 0;
  let stopped = false;

  const voice = (freq: number, t: number) => {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.2, t + 1.8);
    g.gain.setValueAtTime(0.2, t + chordDur - 2);
    g.gain.linearRampToValueAtTime(0.0001, t + chordDur);
    g.connect(filter);

    [-4, 4].forEach((detune) => {
      const o = ctx.createOscillator();
      o.type = "triangle";
      o.frequency.value = freq;
      o.detune.value = detune;
      o.connect(g);
      o.start(t);
      o.stop(t + chordDur + 0.2);
    });

    const o2 = ctx.createOscillator();
    o2.type = "sine";
    o2.frequency.value = freq * 2;
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.0001, t);
    g2.gain.linearRampToValueAtTime(0.045, t + 2);
    g2.gain.linearRampToValueAtTime(0.0001, t + chordDur);
    o2.connect(g2);
    g2.connect(filter);
    o2.start(t);
    o2.stop(t + chordDur + 0.2);
  };

  const schedule = () => {
    if (stopped) return;
    const t = ctx.currentTime + 0.05;
    chords[idx % chords.length].forEach((f) => voice(f, t));
    idx++;
  };

  schedule();
  const iv = window.setInterval(schedule, (chordDur - 0.8) * 1000);

  return {
    stop() {
      stopped = true;
      window.clearInterval(iv);
      master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);
      window.setTimeout(() => ctx.close().catch(() => {}), 1200);
    },
    setMuted(m: boolean) {
      master.gain.exponentialRampToValueAtTime(m ? 0.0001 : 0.16, ctx.currentTime + 0.4);
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export function LetterExperience({ label, opening, paragraphs, signOff, track }: LetterContent) {
  const reduce = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [muted, setMuted] = useState(false);
  const [trackReady, setTrackReady] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SynthHandle | null>(null);
  const usingTrack = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Detect an optional real music track once, up front (harmless 404 if absent).
  useEffect(() => {
    let alive = true;
    fetch(track, { method: "HEAD" })
      .then((r) => {
        if (alive && r.ok) setTrackReady(true);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [track]);

  useEffect(() => {
    return () => {
      synthRef.current?.stop();
      audioRef.current?.pause();
    };
  }, []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    // Start sound inside the click gesture so autoplay is allowed.
    if (trackReady && audioRef.current) {
      const el = audioRef.current;
      el.volume = 0.55;
      el.loop = true;
      el.play()
        .then(() => {
          usingTrack.current = true;
        })
        .catch(() => {
          synthRef.current = startSynth();
        });
    } else {
      synthRef.current = startSynth();
    }

    window.setTimeout(() => setShowLetter(true), reduce ? 0 : 620);
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (usingTrack.current && audioRef.current) audioRef.current.muted = next;
    synthRef.current?.setMuted(next);
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden px-5"
      style={{
        background: "radial-gradient(120% 90% at 50% 22%, #2c1d18 0%, #1c1310 55%, #120c0a 100%)",
        fontFamily: "var(--font-lora), Georgia, serif",
      }}
    >
      <audio ref={audioRef} preload="none" src={track} />

      {/* Ambient drifting glows */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {[
            { x: "18%", y: "26%", s: 260, c: "#a6604d", d: 13 },
            { x: "78%", y: "34%", s: 320, c: "#8a5138", d: 17 },
            { x: "62%", y: "76%", s: 240, c: "#7c4a3f", d: 15 },
            { x: "32%", y: "70%", s: 200, c: "#9c6a4a", d: 19 },
          ].map((g, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: g.x,
                top: g.y,
                width: g.s,
                height: g.s,
                background: g.c,
                filter: "blur(90px)",
                opacity: 0.16,
              }}
              animate={{ y: [0, -22, 0], x: [0, 12, 0] }}
              transition={{ duration: g.d, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
            />
          ))}
        </div>
      )}

      {/* Mute toggle */}
      <AnimatePresence>
        {opened && (
          <motion.button
            type="button"
            onClick={toggleMute}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            aria-label={muted ? "Unmute music" : "Mute music"}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
            style={{ borderColor: "#5a4034", color: "#e6cdb0", background: "rgba(28,19,16,0.6)" }}
          >
            {muted ? <VolumeX className="h-[18px] w-[18px]" /> : <Volume2 className="h-[18px] w-[18px]" />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Envelope */}
      <AnimatePresence>
        {!showLetter && (
          <motion.button
            type="button"
            onClick={handleOpen}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={
              opened
                ? { opacity: 0, scale: 0.92, transition: { duration: 0.5, delay: 0.25 } }
                : { opacity: 1, y: 0 }
            }
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col items-center focus:outline-none"
            aria-label="Open the letter"
          >
            <span className="mb-8 text-[13px] uppercase" style={{ letterSpacing: "0.34em", color: "#c79a72" }}>
              {label}
            </span>

            <motion.div
              className="relative"
              style={{ width: 340, height: 224, perspective: 900 }}
              animate={reduce ? undefined : { y: [0, -9, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="absolute inset-0 rounded-[10px]"
                style={{
                  background: "linear-gradient(160deg, #d3ac7c 0%, #c49a68 100%)",
                  boxShadow: "0 40px 80px -30px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 rounded-b-[10px]"
                style={{
                  height: 150,
                  background: "linear-gradient(160deg, #c8a06f 0%, #b98f5c 100%)",
                  clipPath: "polygon(0 100%, 50% 30%, 100% 100%)",
                }}
              />
              <motion.div
                className="absolute left-0 top-0 w-full origin-top"
                style={{
                  height: 132,
                  background: "linear-gradient(160deg, #c99c66 0%, #bb8d57 100%)",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  backfaceVisibility: "hidden",
                  boxShadow: "0 6px 10px -6px rgba(0,0,0,0.4)",
                }}
                animate={opened ? { rotateX: -172 } : { rotateX: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              />
              <motion.div
                className="absolute left-1/2 flex items-center justify-center rounded-full"
                style={{
                  top: 92,
                  width: 52,
                  height: 52,
                  marginLeft: -26,
                  background: "radial-gradient(circle at 35% 30%, #b0574a, #7f3a30)",
                  boxShadow: "0 6px 14px -4px rgba(0,0,0,0.55), inset 0 1px 2px rgba(255,255,255,0.3)",
                  color: "#f3d9c6",
                  fontSize: 22,
                }}
                animate={opened ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                ♥
              </motion.div>
            </motion.div>

            <span className="mt-8 text-[15px] italic transition-colors" style={{ color: "#cdae8c" }}>
              Tap to open
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Letter */}
      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[88vh] w-full max-w-[660px] overflow-y-auto rounded-[6px]"
            style={{
              background: "linear-gradient(180deg, #f6eddd 0%, #f1e6d2 100%)",
              boxShadow: "0 50px 100px -35px rgba(0,0,0,0.8)",
              color: "#3b2f27",
            }}
          >
            <div className="px-8 py-14 sm:px-14 sm:py-16">
              <p className="mb-2 text-[12px] uppercase" style={{ letterSpacing: "0.3em", color: "#a5764f" }}>
                For you
              </p>

              <h1
                className="mb-9 text-[clamp(2rem,6vw,3rem)] italic leading-tight"
                style={{ color: "#5a3f31" }}
              >
                {opening}
              </h1>

              <div className="space-y-6">
                {paragraphs.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: Math.min(0.15 + i * 0.015, 0.6) }}
                    className="text-[17px] leading-[1.95] sm:text-[18px]"
                    style={{ color: "#43362d" }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <div className="mt-12 flex items-center gap-4">
                <span className="h-px flex-1" style={{ background: "#d8c5a8" }} />
                <span className="text-[20px] italic" style={{ color: "#8a5138" }}>
                  {signOff}
                </span>
                <span style={{ color: "#b0574a" }}>♥</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
