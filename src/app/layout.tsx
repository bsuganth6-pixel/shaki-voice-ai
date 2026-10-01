import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SakhiVoice",
  description: "Government services, in your language.",
};

/* eslint-disable @next/next/no-page-custom-font -- root layout: fonts apply to every page */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background font-body-md text-on-surface antialiased relative min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-primary-fixed-dim/25 via-secondary-fixed-dim/20 to-transparent blur-3xl opacity-70 rounded-full"></div>
        </div>

        <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-container to-secondary-container flex items-center justify-center shadow-[0_4px_16px_rgba(55,48,163,0.18)]">
                  <span className="material-symbols-outlined text-surface-container-lowest text-[22px]">record_voice_over</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-md text-headline-md tracking-tight text-primary leading-tight">SakhiVoice</span>
                  <span className="font-label-sm text-label-sm text-tertiary-container font-semibold tracking-wide">सखी साथी • आवाज़ ही सहारा</span>
                </div>
              </Link>
              <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low text-tertiary-container">
                <span className="material-symbols-outlined text-[16px] text-tertiary-container">verified_user</span>
                <span className="font-label-sm text-label-sm font-semibold">Govt Schemes AI Companion • Privacy-First</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-2">
              <Link href="/companion" className="transition-colors bg-primary-container text-on-primary font-bold rounded-full px-4 py-2">
                Voice Companion
              </Link>
              
            </nav>

            <div className="flex items-center gap-3">
              
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </div>
          </div>
        </header>

        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-surface focus:p-3 focus:rounded">Skip to content</a>
        <main id="main" className="relative z-10 w-full pt-20 bg-transparent flex-1">
          {children}
        </main>

        <footer className="relative z-10 w-full bg-surface-container-low/90 backdrop-blur-md shadow-[0_-1px_6px_rgba(0,0,0,0.02)] mt-auto">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="font-label-md text-label-md font-bold text-on-surface">SakhiVoice — a guide, not an official government service</div>
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface font-medium">
                <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                <span>Independent guidance for citizen empowerment • No paperwork stress</span>
              </div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Privacy: Aadhaar, OTP, PIN and bank numbers are blocked and never stored.</div>
            </div>
            <div className="flex items-center gap-4 text-on-surface-variant">
              <span className="font-label-sm text-label-sm">© 2025 SakhiVoice Foundation</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
