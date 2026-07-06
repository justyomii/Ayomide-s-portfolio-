"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "./ui/button";

interface ContactSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContactSuccessModal({ open, onClose }: ContactSuccessModalProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/80"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-[20%] z-[70] mx-auto max-w-md border border-border bg-background p-8 md:inset-x-auto"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
              <Check className="h-6 w-6 text-accent" aria-hidden />
            </div>

            <h2 id="contact-success-title" className="heading-display mt-6 text-3xl">
              Message sent
            </h2>
            <p className="mt-3 font-sans text-base leading-relaxed text-muted">
              Thanks for reaching out. Ayomide will reply within 24 hours.
            </p>

            <Button type="button" className="mt-8 w-full" onClick={onClose}>
              Close
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
