"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { canSubmitFromClient, markClientSubmit } from "@/lib/contact-client";
import { contact, site } from "@/lib/content";
import {
  contactFormSchema,
  serviceOptions,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { ContactSuccessModal } from "./ContactSuccessModal";
import { SectionHeader } from "./SectionHeader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { Textarea } from "./ui/textarea";

export function Contact() {
  const [successOpen, setSuccessOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues & { website?: string }>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data: ContactFormValues & { website?: string }) => {
    const clientCheck = canSubmitFromClient();
    if (!clientCheck.allowed) {
      toast.error("Please wait before sending another message.", {
        description: `Try again in ${clientCheck.waitSeconds} seconds.`,
      });
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok) {
        toast.error(payload.error ?? "Could not send your message.");
        return;
      }

      markClientSubmit();
      reset();
      setSuccessOpen(true);
    } catch {
      toast.error("Could not send your message. Please try again or email directly.");
    }
  };

  return (
    <>
      <section id="contact" className="section-padding border-t border-border">
        <div className="site-container">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionHeader
                label={contact.label}
                title={contact.headline}
                description={contact.lead}
              />

              <div className="space-y-8 font-sans">
                <div>
                  <p className="text-[13px] text-muted">Email</p>
                  <a
                    href={`mailto:${contact.directEmail}`}
                    className="mt-2 inline-block text-base text-foreground transition-colors hover:text-accent md:text-[17px]"
                  >
                    {contact.directEmail}
                  </a>
                </div>

                <div>
                  <p className="text-[13px] text-muted">LinkedIn</p>
                  {site.linkedin ? (
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-base text-foreground transition-colors hover:text-accent"
                    >
                      View profile
                    </a>
                  ) : (
                    <p className="mt-2 text-base text-muted">Coming soon</p>
                  )}
                </div>

                <div>
                  <p className="text-[13px] text-muted">Schedule</p>
                  <a
                    href={contact.bookCall.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-base font-medium text-accent transition-colors hover:text-accent-hover md:text-[17px]"
                  >
                    {contact.bookCall.label}
                  </a>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 border-t border-border pt-10 lg:border-t-0 lg:pt-0"
              noValidate
            >
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  {...register("name")}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-red-400" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-red-400" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Service needed</Label>
                <Select
                  id="service"
                  defaultValue=""
                  aria-invalid={!!errors.service}
                  aria-describedby={errors.service ? "service-error" : undefined}
                  {...register("service")}
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                {errors.service && (
                  <p id="service-error" className="text-xs text-red-400" role="alert">
                    {errors.service.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="What do you need help with?"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  {...register("message")}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-red-400" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <ContactSuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </>
  );
}
