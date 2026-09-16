"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play, Volume2, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type AnniversaryMedia = {
  type?: "image" | "video";
  src: string;
  caption: string;
  rotate?: number;
  poster?: string; // optional still frame for videos
};

export type AnniversaryContent = {
  title: string;
  dateLine: string;
  startDate: string; // ISO date the relationship began, for the day counter
  opening: string;
  paragraphs: string[];
  media: AnniversaryMedia[];
  signOff: string;
  ps?: string;
  track: string; // optional mp3, e.g. "/anniversary/theme.mp3"
};

/* -------------------------------------------------------------------------- */
/*  Audio fallback — a warm string pad, if no mp3 is present.                  */
/* -------------------------------------------------------------------------- */

type SynthHandle = { stop: () => void; setMuted: (m: boolean) => void };

function startSynth(): SynthHandle {
  const AC: typeof AudioContext =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AC();

  const master = ctx.createGain();
  master.gain.value = 0.0001;
  master.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 4);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1700;
  filter.Q.value = 0.2;
  filter.connect(master);
  master.connect(ctx.destination);

  const delay = ctx.createDelay(1.0);
  delay.delayTime.value = 0.42;
  const fb = ctx.createGain();
  fb.gain.value = 0.3;
  const wet = ctx.createGain();
  wet.gain.value = 0.24;
  master.connect(delay);
  delay.connect(fb);
  fb.connect(delay);
  delay.connect(wet);
  wet.connect(ctx.destination);

  const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);
  const chords = [
    [55, 59, 62, 66],
    [50, 57, 60, 64],
    [48, 55, 60, 64],
    [53, 57, 60, 65],
  ].map((c) => c.map(midi));

  const chordDur = 6.5;
  let idx = 0;
  let stopped = false;

  const voice = (freq: number, t: number) => {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.18, t + 2);
    g.gain.setValueAtTime(0.18, t + chordDur - 2.2);
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
    g2.gain.linearRampToValueAtTime(0.04, t + 2.4);
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
  const iv = window.setInterval(schedule, (chordDur - 0.9) * 1000);

  return {
    stop() {
      stopped = true;
      window.clearInterval(iv);
      master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);
      window.setTimeout(() => ctx.close().catch(() => {}), 1200);
    },
    setMuted(m: boolean) {
      master.gain.exponentialRampToValueAtTime(m ? 0.0001 : 0.15, ctx.currentTime + 0.4);
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  A single taped photo or video, with a graceful placeholder.                */
/* -------------------------------------------------------------------------- */

function TapedMedia({
  media,
  onOpen,
}: {
  media: AnniversaryMedia;
  onOpen: (m: AnniversaryMedia) => void;
}) {
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();
  const isVideo = media.type === "video";

  return (
    <motion.button
      type="button"
      onClick={() => !failed && onOpen(media)}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={reduce || failed ? undefined : { rotate: 0, y: -6, scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative shrink-0 focus:outline-none"
      style={{ transform: `rotate(${media.rotate ?? 0}deg)`, cursor: failed ? "default" : "zoom-in" }}
      aria-label={media.caption}
    >
      <span
        aria-hidden
        className="absolute left-1/2 top-[-10px] z-10 h-5 w-16 -translate-x-1/2"
        style={{ background: "rgba(214,197,150,0.4)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transform: "rotate(-4deg)" }}
      />
      <div className="p-3 pb-8" style={{ background: "#f6f1e6", boxShadow: "0 14px 30px -14px rgba(0,0,0,0.55)" }}>
        <div className="relative h-[190px] w-[168px] overflow-hidden bg-[#d9cbb0]">
          {failed ? (
            <div
              className="flex h-full w-full items-center justify-center text-center"
              style={{ background: "linear-gradient(160deg,#e4d7bd,#d3c3a2)" }}
            >
              <span className="px-4 font-[family-name:var(--font-lora)] text-[12px] italic text-[#8a7355]">
                a moment,
                <br />
                here soon
              </span>
            </div>
          ) : isVideo ? (
            <>
              <video
                src={`${media.src}#t=0.1`}
                poster={media.poster}
                muted
                playsInline
                preload="metadata"
                onError={() => setFailed(true)}
                className="h-full w-full object-cover"
                style={{ filter: "sepia(0.12) contrast(1.02)" }}
              />
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                style={{ background: "rgba(20,12,5,0.55)", color: "#f6ead2", backdropFilter: "blur(2px)" }}
              >
                <Play className="h-4 w-4" style={{ marginLeft: 2 }} />
              </span>
            </>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={media.src}
              alt={media.caption}
              onError={() => setFailed(true)}
              className="h-full w-full object-cover"
              style={{ filter: "sepia(0.12) contrast(1.02)" }}
            />
          )}
        </div>
        <p className="mt-3 text-center font-[family-name:var(--font-lora)] text-[13px] italic text-[#6d5842]">
          {media.caption}
        </p>
      </div>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scroll furniture                                                           */
/* -------------------------------------------------------------------------- */

const WOOD = "linear-gradient(180deg,#7a5330 0%,#5b3a1e 45%,#43290f 100%)";
const PARCHMENT = "linear-gradient(180deg,#efe4cb 0%,#e9dcbe 45%,#e2d0ac 100%)";
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.42 0 0 0 0 0.32 0 0 0 0 0.18 0 0 0 0.05 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

function WoodRod() {
  return (
    <div className="relative mx-auto w-full max-w-[720px]">
      <div className="h-4 w-full rounded-full" style={{ background: WOOD, boxShadow: "0 6px 14px -6px rgba(0,0,0,0.6)" }} />
      <span aria-hidden className="absolute -left-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle at 35% 30%,#8a6238,#4a2f14)" }} />
      <span aria-hidden className="absolute -right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle at 35% 30%,#8a6238,#4a2f14)" }} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export function AnniversaryScroll({
  title,
  dateLine,
  startDate,
  opening,
  paragraphs,
  media,
  signOff,
  ps,
  track,
}: AnniversaryContent) {
  const reduce = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(false);
  const [trackReady, setTrackReady] = useState(false);
  const [maxH, setMaxH] = useState(0);
  const [days, setDays] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<AnniversaryMedia | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SynthHandle | null>(null);
  const usingTrack = useRef(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const start = new Date(startDate).getTime();
    if (!Number.isNaN(start)) setDays(Math.max(0, Math.floor((Date.now() - start) / 86_400_000)));
  }, [startDate]);

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
    const el = contentRef.current;
    if (!el) return;
    const measure = () => setMaxH(el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      synthRef.current?.stop();
      audioRef.current?.pause();
    };
  }, []);

  // Duck / restore the background music (used while a video plays).
  const duckBackground = useCallback((duck: boolean) => {
    if (usingTrack.current && audioRef.current) audioRef.current.muted = duck ? true : muted;
    synthRef.current?.setMuted(duck ? true : muted);
  }, [muted]);

  const handleOpen = useCallback(() => {
    if (opened) return;
    setOpened(true);
    if (trackReady && audioRef.current) {
      const el = audioRef.current;
      el.volume = 0.5;
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
  }, [opened, trackReady]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (usingTrack.current && audioRef.current) audioRef.current.muted = next;
    synthRef.current?.setMuted(next);
  };

  const openMedia = (m: AnniversaryMedia) => {
    setLightbox(m);
    if (m.type === "video") duckBackground(true);
  };
  const closeLightbox = () => {
    if (lightbox?.type === "video") duckBackground(false);
    setLightbox(null);
  };

  return (
    <div
      className="fixed inset-0 z-[90] overflow-y-auto"
      style={{ background: "radial-gradient(120% 85% at 50% 12%, #3a2416 0%, #241408 55%, #160c05 100%)" }}
    >
      <audio ref={audioRef} preload="none" src={track} />

      {/* candle glow */}
      {!reduce && (
        <div className="pointer-events-none fixed inset-0" aria-hidden>
          <motion.div
            className="absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(ellipse at center, rgba(255,180,90,0.18), transparent 70%)", filter: "blur(20px)" }}
            animate={{ opacity: [0.55, 0.8, 0.55] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* drifting petals */}
      {!reduce && opened && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
          {[8, 22, 40, 58, 72, 88].map((left, i) => (
            <motion.div
              key={i}
              className="absolute top-[-6%]"
              style={{ left: `${left}%` }}
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: "112vh", opacity: [0, 0.8, 0.8, 0], rotate: [0, 180, 360] }}
              transition={{ duration: 13 + (i % 4) * 3, repeat: Infinity, delay: i * 2.2, ease: "linear" }}
            >
              <span
                style={{
                  display: "block",
                  width: 12,
                  height: 12,
                  borderRadius: "0 100% 0 100%",
                  background: "linear-gradient(135deg,#d99a92,#b96a62)",
                  opacity: 0.7,
                }}
              />
            </motion.div>
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
            transition={{ delay: 0.6 }}
            aria-label={muted ? "Unmute music" : "Mute music"}
            className="fixed right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border"
            style={{ borderColor: "#6b4a2b", color: "#f0d9b0", background: "rgba(28,16,8,0.6)" }}
          >
            {muted ? <VolumeX className="h-[18px] w-[18px]" /> : <Volume2 className="h-[18px] w-[18px]" />}
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative mx-auto flex min-h-full w-full max-w-[760px] flex-col items-center px-5 py-14 md:py-20">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-[family-name:var(--font-cinzel)] text-[12px] tracking-[0.42em] text-[#c79a6a]"
        >
          OUR ANNIVERSARY
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-4 text-center font-[family-name:var(--font-cinzel)] text-[clamp(2.2rem,7vw,3.6rem)] font-medium leading-tight text-[#f2dcb6]"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mt-3 font-[family-name:var(--font-lora)] text-[14px] italic text-[#caa77f]"
        >
          {dateLine}
          {days !== null ? ` · ${days} days, and counting` : ""}
        </motion.p>

        <div className="mt-6 flex items-center gap-2.5" aria-hidden>
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-full"
              style={{
                background: i === 6 ? "radial-gradient(circle at 35% 30%,#c07a4a,#7f2f26)" : "#5a3a22",
                boxShadow: i === 6 ? "0 0 10px 1px rgba(192,122,74,0.6)" : "none",
              }}
            />
          ))}
        </div>

        <div className="mt-10 w-full">
          <WoodRod />
        </div>

        {/* Rolled seal (before open) */}
        <AnimatePresence>
          {!opened && (
            <motion.button
              type="button"
              onClick={handleOpen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              transition={{ duration: 0.6 }}
              className="group relative mt-[-2px] flex w-full max-w-[720px] flex-col items-center focus:outline-none"
              aria-label="Break the seal and open the scroll"
            >
              <div
                className="h-16 w-[94%] rounded-b-[10px]"
                style={{ background: PARCHMENT, boxShadow: "inset 0 -10px 18px -10px rgba(90,60,25,0.5), 0 14px 30px -18px rgba(0,0,0,0.7)" }}
              />
              <motion.span
                className="mt-[-30px] flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  background: "radial-gradient(circle at 35% 30%, #a24438, #6f2820)",
                  boxShadow: "0 8px 18px -6px rgba(0,0,0,0.6), inset 0 1px 3px rgba(255,255,255,0.25)",
                  color: "#f3d9c6",
                  fontSize: 24,
                }}
                animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              >
                &#10084;
              </motion.span>
              <span className="mt-6 font-[family-name:var(--font-lora)] text-[15px] italic text-[#d3b083]">
                Break the seal
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Parchment (unrolls) */}
        <div
          className="w-full max-w-[720px] overflow-hidden"
          style={{ height: opened ? maxH : 0, transition: reduce ? "none" : "height 1.3s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <div ref={contentRef} className="relative" style={{ background: PARCHMENT, boxShadow: "0 30px 70px -30px rgba(0,0,0,0.8)" }}>
            <div className="pointer-events-none absolute inset-0" aria-hidden style={{ backgroundImage: NOISE, opacity: 0.5 }} />
            <div className="pointer-events-none absolute inset-0" aria-hidden style={{ boxShadow: "inset 0 0 90px 10px rgba(120,85,40,0.35)" }} />

            <div className="relative px-7 py-14 sm:px-14 sm:py-16">
              <h2 className="text-center font-[family-name:var(--font-cinzel)] text-[22px] tracking-[0.1em] text-[#5a4227]">
                {opening}
              </h2>

              <div className="mx-auto mt-9 max-w-[560px] space-y-6">
                {paragraphs.map((line, i) => (
                  <p key={i} className="font-[family-name:var(--font-lora)] text-[17px] leading-[1.95] text-[#4a3a27] sm:text-[18px]">
                    {line}
                  </p>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap items-start justify-center gap-6 sm:gap-8">
                {media.map((m) => (
                  <TapedMedia key={m.src} media={m} onOpen={openMedia} />
                ))}
              </div>

              <div className="mx-auto mt-14 flex max-w-[560px] items-center gap-4">
                <span className="h-px flex-1" style={{ background: "#c9b48c" }} />
                <span className="font-[family-name:var(--font-cinzel)] text-[18px] tracking-[0.08em] text-[#7f2f26]">
                  {signOff}
                </span>
                <span style={{ color: "#a24438" }}>&#10084;</span>
              </div>

              {ps && (
                <motion.p
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.8 }}
                  className="mx-auto mt-10 max-w-[560px] text-center font-[family-name:var(--font-lora)] text-[14px] italic text-[#6d5842]"
                >
                  {ps}
                </motion.p>
              )}
            </div>
          </div>

          {opened && (
            <div className="mt-[-2px]">
              <WoodRod />
            </div>
          )}
        </div>
      </div>

      {/* Lightbox (image or video) */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/85 p-6"
            onClick={closeLightbox}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={closeLightbox}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border"
              style={{ borderColor: "#6b4a2b", color: "#f0d9b0", background: "rgba(28,16,8,0.6)" }}
            >
              <X className="h-[18px] w-[18px]" />
            </button>
            <motion.figure
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[86vh] max-w-[86vw] p-3 pb-6"
              style={{ background: "#f6f1e6", boxShadow: "0 30px 70px -20px rgba(0,0,0,0.8)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.type === "video" ? (
                <video
                  src={lightbox.src}
                  poster={lightbox.poster}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[74vh] max-w-full object-contain"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={lightbox.src}
                  alt={lightbox.caption}
                  className="max-h-[74vh] max-w-full object-contain"
                  style={{ filter: "sepia(0.1)" }}
                />
              )}
              <figcaption className="mt-3 text-center font-[family-name:var(--font-lora)] text-[14px] italic text-[#6d5842]">
                {lightbox.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
