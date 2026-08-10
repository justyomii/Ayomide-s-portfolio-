"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  The letter                                                                 */
/* -------------------------------------------------------------------------- */

const OPENING = "My love,";

// Each entry renders as its own line. Short lines are intentional — they carry
// the weight. Kept in a natural, spoken voice.
const PARAGRAPHS: string[] = [
  "I don't really know how to start this without it sounding heavier than I mean it to, so I'm just going to be honest with you for a minute. Lately I've been feeling something between us that I can't quite name. It isn't that you've stopped loving me, and I'm not saying this because you took a little longer to reply or because our conversations aren't as long as they used to be. People get busy, moods shift, life gets in the way, and some days you just don't have the energy to talk. I understand all of that. It's only that when I look at us lately, something feels quieter than it used to.",

  "I miss the way we used to talk. The random conversations that somehow lasted forever. The long explanations. The little details you'd tell me without me even asking. The calls out of nowhere. The warmth. That feeling that we could talk about absolutely nothing and still love just being together. I miss the liveliness between us. I miss you not being able to wait to tell me something, and I miss being that person for you too. Even the smallest things mattered, because we shared them.",

  "Maybe that's why this has been on my mind so much. You're not just someone I'm dating. You're someone I genuinely see in my future. When I picture the life I want, you're in it. When I think about marriage, you're there. When I imagine growing old and looking back on this part of my life, I want to know I did everything I could to protect what we have, not that I watched it quietly turn into something we stopped talking about.",

  "I don't want to wait until the distance feels normal to both of us.",

  "I don't want us to become two people who love each other but barely know what's going on in each other's heads anymore.",

  "And I don't want to pretend that doesn't scare me.",

  "Sometimes I wonder if I'm the only one noticing it. Sometimes I wonder if you've felt it too and just haven't known how to say it. Sometimes I wonder if something has changed for you, and I'm finding out slowly through the little things before you ever tell me. But I don't want to assume anything about your heart. It's yours, and only you can tell me what's inside it.",

  "So I'm asking you.",

  "Do you still feel the same way about me?",

  "Do you still feel the connection between us?",

  "Do you still look at me and see the person you want to build your life with?",

  "Please don't answer with what you think will make me feel better. I don't need a perfect answer. I don't need you to tell me everything's fine if it isn't. I just want the truth, because if something has changed, I want us to talk about it while we still care enough to do something about it.",

  "And if nothing has changed, I want to hear that too. I want to understand where you are and what you've been feeling. I want to know if there's something you need from me that I haven't been giving you, or something you've wanted to say and haven't known how. This isn't me blaming you for being distant. I just want us to look at each other honestly and ask ourselves where we are.",

  "Because I love you. I really do.",

  "Sometimes I think I love you enough that the thought of losing what we have scares me more than I know how to explain. Not because love should be something we hold onto out of fear, but because what we've built means so much to me. We've been able to be ourselves with each other in a way I don't take for granted. You've seen parts of me I don't show anyone, and I've come to know parts of you I never want to forget.",

  "I don't want our love to survive only because we technically still love each other.",

  "I want it to feel alive.",

  "I want us to stay curious about each other. I want to hear about your day and actually want every detail. I want you to call me out of nowhere because you have something silly to tell me. I want the long messages again. The softness. The warmth. I want us to keep discovering each other instead of slowly turning into familiar strangers.",

  "I know relationships change. I know that first intensity can't stay exactly the same forever, and I'm not asking us to live in some permanent honeymoon. I just don't want us to stop choosing each other.",

  "If we're tired, let's say we're tired.",

  "If something hurts, let's say it hurts.",

  "If something has changed, let's talk about it.",

  "If we're drifting, let's reach for each other before the distance gets too wide.",

  "I don't expect you to be perfect, and I don't expect that of myself either. I'm sure there are things I've done that have made you feel distant too. I want to hear them. I'm willing to change where I need to. I'm willing to learn you again if parts of you have changed since we first met.",

  "I just don't want to lose you quietly.",

  "I don't want our last truly beautiful conversation to become something we look back on years from now, wondering what happened after that.",

  "I want us to be able to look at this moment and say we noticed something wasn't right, we talked about it, we were honest, and we chose what to do from there.",

  "Because I still choose you.",

  "I still want you.",

  "I still want to see where this goes.",

  "I still want the future I imagine when I think about you.",

  "And yes, I still want to marry you.",

  "But I don't want to marry a memory of who we used to be. I want to build that future with the person you're becoming, and I want to become someone worth building it with. I want us to keep growing without growing away from each other.",

  "So before we talk, I wanted you to know what's been sitting in my heart.",

  "I'm not bringing this to you because I want to fight.",

  "I'm not bringing it because I need reassurance.",

  "I'm bringing it because I love you enough to ask.",

  "And whatever you have to say, I want you to really say it. No pretending. No protecting me from the truth. No saying what you think I want to hear.",

  "Just you.",

  "And me.",

  "Being honest with each other.",

  "Because whatever happens from here, I want our love to have always been something we were brave enough to tell the truth about.",

  "I love you, my love.",

  "And I really, really hope we're still walking toward the same future.",
];

const SIGN_OFF = "Yours, always.";

/* -------------------------------------------------------------------------- */
/*  Audio — a warm string pad synthesized in the browser.                      */
/*  Guaranteed to work with no asset. If you drop a licensed track at          */
/*  public/letter/theme.mp3, it will play that instead automatically.          */
/* -------------------------------------------------------------------------- */

type SynthHandle = { stop: () => void; setMuted: (m: boolean) => void };

function startSynth(): SynthHandle {
  const AC: typeof AudioContext =
    window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

  // Soft space via a feedback delay.
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
  // Fmaj7 · Dm7 · B♭maj7 · Cmaj7 — a warm, resolving loop.
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

    // A quiet octave sine for shimmer.
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

export function LetterClient() {
  const reduce = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [muted, setMuted] = useState(false);
  const [trackReady, setTrackReady] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SynthHandle | null>(null);
  const usingTrack = useRef(false);

  // Lock the page behind the overlay.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Detect an optional real music track once, up front (harmless 404 if absent).
  useEffect(() => {
    let alive = true;
    fetch("/letter/theme.mp3", { method: "HEAD" })
      .then((r) => {
        if (alive && r.ok) setTrackReady(true);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // Clean up audio on unmount.
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
        background:
          "radial-gradient(120% 90% at 50% 22%, #2c1d18 0%, #1c1310 55%, #120c0a 100%)",
        fontFamily: "var(--font-lora), Georgia, serif",
      }}
    >
      <audio ref={audioRef} preload="none" src="/letter/theme.mp3" />

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
            <span
              className="mb-8 text-[13px] uppercase"
              style={{ letterSpacing: "0.34em", color: "#c79a72" }}
            >
              A letter for you
            </span>

            <motion.div
              className="relative"
              style={{ width: 340, height: 224, perspective: 900 }}
              animate={reduce ? undefined : { y: [0, -9, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Body */}
              <div
                className="absolute inset-0 rounded-[10px]"
                style={{
                  background: "linear-gradient(160deg, #d3ac7c 0%, #c49a68 100%)",
                  boxShadow: "0 40px 80px -30px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
              />
              {/* Inner pocket edges */}
              <div
                className="absolute inset-x-0 bottom-0 rounded-b-[10px]"
                style={{
                  height: 150,
                  background: "linear-gradient(160deg, #c8a06f 0%, #b98f5c 100%)",
                  clipPath: "polygon(0 100%, 50% 30%, 100% 100%)",
                }}
              />
              {/* Flap */}
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
              {/* Wax seal */}
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

            <span
              className="mt-8 text-[15px] italic transition-colors"
              style={{ color: "#cdae8c" }}
            >
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
              <p
                className="mb-2 text-[12px] uppercase"
                style={{ letterSpacing: "0.3em", color: "#a5764f" }}
              >
                For you
              </p>

              <h1
                className="mb-9 text-[clamp(2rem,6vw,3rem)] italic leading-tight"
                style={{ color: "#5a3f31" }}
              >
                {OPENING}
              </h1>

              <div className="space-y-6">
                {PARAGRAPHS.map((line, i) => (
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
                  {SIGN_OFF}
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
