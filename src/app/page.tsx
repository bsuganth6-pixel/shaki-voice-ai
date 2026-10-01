import Link from 'next/link';

export default function Home() {

  return (
    <div className="flex flex-col w-full">
      <section className="relative w-full overflow-hidden px-6 lg:px-12 py-10 lg:py-16">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-container shadow-sm mb-8 animate-fade-in">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-secondary -ml-5"></span>
            <span className="font-label-sm text-label-sm text-primary font-bold tracking-wide uppercase">குரல் வழி வழிகாட்டி • National Sovereign Citizen Assist</span>
          </div>
          <div className="space-y-4 max-w-4xl">
            <h1 className="font-headline-xl text-headline-xl tracking-tight text-primary">
              அரசு சேவைகள், உங்கள் மொழியில்.
            </h1>
            <p className="font-headline-md text-headline-md text-on-surface-variant font-medium">
              Government services, in your language.
            </p>
          </div>
          <div className="mt-6 max-w-2xl bg-surface-container-low/70 backdrop-blur-sm p-4 rounded-2xl shadow-sm space-y-1.5">
            <p className="font-body-lg text-body-lg text-on-surface">
              Speak naturally. Understand the process. Take the next step yourself.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant font-medium">
              என்ன செய்ய வேண்டும் என்று தெரியாவிட்டாலும் பரவாயில்லை. நாங்கள் ஒவ்வொரு படியாக சொல்லித் தருகிறோம்.
            </p>
          </div>
          <div className="relative my-12 lg:my-16 flex items-center justify-center w-full max-w-md h-80">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-fixed-dim/40 via-secondary-fixed-dim/30 to-tertiary-fixed-dim/30 rounded-full blur-3xl opacity-60 animate-pulse"></div>
            <div className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-primary-container via-primary to-secondary-container opacity-20 blur-xl"></div>
            <div className="absolute w-64 h-64 rounded-full bg-surface-container-high/40 animate-ping opacity-30" style={{ animationDuration: '3s' }}></div>
            <div className="absolute w-52 h-52 rounded-full bg-secondary-fixed/50 animate-pulse"></div>
            <div className="relative w-44 h-44 rounded-full bg-gradient-to-tr from-primary-container via-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/30 transform hover:scale-105 transition-transform duration-500">
              <div className="w-36 h-36 rounded-full bg-gradient-to-bl from-secondary-container via-primary-container to-primary flex flex-col items-center justify-center p-4 text-center">
                <div className="flex items-center gap-1.5 h-8 mb-2">
                  <span className="w-1 bg-on-primary rounded-full animate-bounce" style={{ height: '14px', animationDelay: '0.1s' }}></span>
                  <span className="w-1 bg-on-primary rounded-full animate-bounce" style={{ height: '24px', animationDelay: '0.3s' }}></span>
                  <span className="w-1.5 bg-on-primary rounded-full animate-bounce" style={{ height: '32px', animationDelay: '0.2s' }}></span>
                  <span className="w-1 bg-on-primary rounded-full animate-bounce" style={{ height: '26px', animationDelay: '0.4s' }}></span>
                  <span className="w-1 bg-on-primary rounded-full animate-bounce" style={{ height: '12px', animationDelay: '0.25s' }}></span>
                </div>
                <span className="font-label-sm text-label-sm text-on-primary font-semibold tracking-wider uppercase opacity-95">Sakhi AI</span>
              </div>
              <div className="absolute -bottom-2 px-3 py-1 rounded-full bg-surface-container-lowest shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
                <span className="font-label-sm text-label-sm text-tertiary font-bold">கேட்கத் தயார் • Ready</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-xl">
            <Link href="/companion" className="group w-full sm:w-auto flex-1 min-h-[64px] px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary-container hover:to-secondary-container text-on-primary shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 ">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px] text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
              </div>
              <div className="text-left flex flex-col">
                <span className="font-label-lg text-label-lg font-bold leading-tight">Start speaking</span>
                <span className="font-label-sm text-label-sm opacity-90 font-medium">பேசத் தொடங்குங்கள்</span>
              </div>
            </Link>
            <Link href="/companion" className="w-full sm:w-auto px-6 py-4 min-h-[64px] rounded-full bg-surface-container-lowest hover:bg-surface-container transition-colors shadow-md flex items-center justify-center gap-3 text-on-surface">
              <span className="material-symbols-outlined text-primary text-[22px]">translate</span>
              <div className="text-left flex flex-col">
                <span className="font-label-md text-label-md font-bold">Choose language</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">மொழியைத் தேர்வு செய்க</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold ml-1">தமிழ்</span>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-on-surface-variant">
            <div className="flex items-center gap-1.5 font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
              Simple guidance
            </div>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-1.5 font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-tertiary text-[18px]">translate</span>
              Multilingual
            </div>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-1.5 font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-tertiary text-[18px]">lock</span>
              Privacy-first
            </div>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-1.5 font-label-sm text-label-sm font-semibold text-secondary">
              <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
              100% Free Voice Companion
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 lg:px-12 py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-primary-fixed-dim/20 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary mb-6 shadow-sm">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>record_voice_over</span>
              </div>
              <span className="font-label-sm text-label-sm text-primary font-bold tracking-wider uppercase">01 / எளிய குரல் வழி</span>
              <h2 className="font-headline-md text-headline-md text-on-surface mt-2 mb-3">Voice First</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Press the button and answer in your own language. If your browser has no microphone support, you can type instead.
              </p>
            </div>
            <div className="mt-8 pt-4 bg-surface-container-low -mx-8 -mb-8 px-8 py-4 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">பேசினாலே போதும்</span>
              <span className="material-symbols-outlined text-[18px] text-primary">arrow_forward</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-secondary-fixed-dim/30 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary mb-6 shadow-sm">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>language</span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-bold tracking-wider uppercase">02 / உங்கள் தாய்மொழி</span>
              <h2 className="font-headline-md text-headline-md text-on-surface mt-2 mb-3">Your Language</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Tamil, Hindi and English today, by voice or by typing. More Indian languages are planned.
              </p>
            </div>
            <div className="mt-8 pt-4 bg-surface-container-low -mx-8 -mb-8 px-8 py-4 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">3 மொழிகள் ஆதரவு</span>
              <span className="material-symbols-outlined text-[18px] text-secondary">arrow_forward</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-tertiary-fixed-dim/30 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-tertiary mb-6 shadow-sm">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>checklist</span>
              </div>
              <span className="font-label-sm text-label-sm text-tertiary-container font-bold tracking-wider uppercase">03 / படிப்படியான உதவி</span>
              <h2 className="font-headline-md text-headline-md text-on-surface mt-2 mb-3">Step by Step</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Zero technical bureaucracy. We deconstruct huge government application procedures into one gentle, conversational question at a time.
              </p>
            </div>
            <div className="mt-8 pt-4 bg-surface-container-low -mx-8 -mb-8 px-8 py-4 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">பயமின்றி சுலபமாக அறியலாம்</span>
              <span className="material-symbols-outlined text-[18px] text-tertiary">arrow_forward</span>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 lg:px-12 py-10 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low rounded-3xl p-8 lg:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest text-tertiary font-label-sm text-label-sm font-bold shadow-sm">
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              நேரடி குரல் மாதிரி • Sample Dialogue
            </div>
            <h3 className="font-headline-lg text-headline-lg text-primary">
              &quot;எனக்கு இலவச சமையல் எரிவாயு சிலிண்டர் கிடைக்குமா?&quot;
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Sakhi asks a few simple questions, checks the published scheme rules, and tells you which documents to bring.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3.5 py-1.5 rounded-full bg-surface-container-lowest font-label-sm text-label-sm text-on-surface font-medium shadow-sm">மகளிர் உரிமைத் தொகை</span>
              <span className="px-3.5 py-1.5 rounded-full bg-surface-container-lowest font-label-sm text-label-sm text-on-surface font-medium shadow-sm">PM Awas Yojana</span>
              <span className="px-3.5 py-1.5 rounded-full bg-surface-container-lowest font-label-sm text-label-sm text-on-surface font-medium shadow-sm">ரேஷன் கார்டு புதுப்பித்தல்</span>
              <span className="px-3.5 py-1.5 rounded-full bg-surface-container-lowest font-label-sm text-label-sm text-on-surface font-medium shadow-sm">Kalaignar Magalir Urimai</span>
            </div>
          </div>
          <div className="w-full lg:w-96 flex flex-col gap-4">
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm font-bold text-primary">Sakhi Voice Status</span>
                <span className="font-label-sm text-label-sm text-tertiary font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span> Voice + text
                </span>
              </div>
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary w-3/4 rounded-full"></div>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                We never ask for Aadhaar, OTP, PIN or bank numbers. If you say them, they are blocked and not stored.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
