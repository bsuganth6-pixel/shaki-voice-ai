'use client';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { greeting, newSession, step, type Session } from '@/lib/conversation';
import { LANGS } from '@/lib/i18n';
import type { Lang } from '@/lib/types';

type Msg = { from: 'sakhi' | 'you'; text: string; link?: string };

// Minimal typings for the browser Web Speech API (not in lib.dom for all targets).
interface Recognition {
  lang: string; interimResults: boolean; maxAlternatives: number;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null; onend: (() => void) | null;
  start(): void; stop(): void;
}
type RecognitionCtor = new () => Recognition;

export default function Companion() {
  const [lang, setLang] = useState<Lang>('ta');
  const [session, setSession] = useState<Session>(() => newSession('ta'));
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'sakhi', text: greeting('ta') }]);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [speakOn, setSpeakOn] = useState(true);
  const voiceOk = useSyncExternalStore(
    () => () => {},
    () => { const w = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }; return Boolean(w.SpeechRecognition ?? w.webkitSpeechRecognition); },
    () => false,
  );
  const [notice, setNotice] = useState('');
  const recRef = useRef<Recognition | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const speech = LANGS.find((l) => l.code === lang)!.speech;

  useEffect(() => { document.documentElement.lang = speech; }, [speech]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const speak = useCallback((lines: string[]) => {
    if (!speakOn || typeof speechSynthesis === 'undefined') return;
    speechSynthesis.cancel();
    lines.forEach((l) => {
      const u = new SpeechSynthesisUtterance(l.replace(/https?:\/\/\S+/g, ''));
      u.lang = speech; u.rate = 0.9;
      speechSynthesis.speak(u);
    });
  }, [speakOn, speech]);

  const reset = (l: Lang) => {
    setLang(l); setSession(newSession(l)); setMsgs([{ from: 'sakhi', text: greeting(l) }]); setNotice('');
    speechSynthesis?.cancel();
  };

  const submit = useCallback(async (raw: string) => {
    const input = raw.trim().slice(0, 300);
    if (!input) return;
    let turn = step(session, input);
    // If local parsing failed, ask the optional server-side AI helper (key never reaches the browser).
    if (turn.understood === false && session.step !== 'done') {
      try {
        const r = await fetch('/api/assist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ field: session.step, text: input }) });
        if (r.ok) { const { value } = await r.json(); if (typeof value === 'string') turn = step(session, value); }
      } catch { /* offline or no key: keep the deterministic fallback */ }
    }
    const shown = turn.say;
    // Never echo what may be a secret back into the transcript.
    const safeInput = turn.understood === false && /\d{4,}/.test(input) ? '••••' : input;
    setMsgs((m) => [...m, { from: 'you', text: safeInput }, ...shown.map((t) => ({ from: 'sakhi' as const, text: t })), ...(turn.handoffUrl ? [{ from: 'sakhi' as const, text: turn.handoffUrl, link: turn.handoffUrl }] : [])]);
    setSession(turn.session);
    speak(shown);
  }, [session, speak]);

  const listen = () => {
    const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) { setNotice('Voice is not supported in this browser. Please type your answer.'); return; }
    if (listening) { recRef.current?.stop(); return; }
    speechSynthesis?.cancel();
    const rec = new Ctor();
    rec.lang = speech; rec.interimResults = false; rec.maxAlternatives = 1;
    rec.onresult = (e) => { void submit(e.results[0][0].transcript); };
    rec.onerror = () => setNotice('I could not hear you. Please try again or type.');
    rec.onend = () => setListening(false);
    recRef.current = rec; setListening(true); setNotice(''); rec.start();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Language">
        {LANGS.map((l) => (
          <button key={l.code} type="button" onClick={() => reset(l.code)} aria-pressed={lang === l.code}
            className={`min-h-[48px] px-5 rounded-full font-label-lg text-label-lg ${lang === l.code ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface'}`}>
            {l.label}
          </button>
        ))}
        <button type="button" onClick={() => setSpeakOn((v) => !v)} aria-pressed={speakOn} className="min-h-[48px] px-4 rounded-full bg-surface-container-high ml-auto font-label-md text-label-md">
          {speakOn ? 'Voice reply: on' : 'Voice reply: off'}
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-3xl shadow-sm p-4 min-h-[320px] max-h-[55vh] overflow-y-auto flex flex-col gap-3" role="log" aria-live="polite" aria-label="Conversation">
        {msgs.map((m, i) => (
          <div key={i} className={`max-w-[85%] px-4 py-3 rounded-2xl font-body-lg text-body-lg ${m.from === 'sakhi' ? 'bg-primary-fixed text-on-surface self-start' : 'bg-secondary-fixed text-on-surface self-end'}`}>
            {m.link ? <a className="underline font-bold break-all" href={m.link} target="_blank" rel="noopener noreferrer">{m.link}</a> : m.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {notice && <p role="alert" className="text-error font-label-md text-label-md">{notice}</p>}

      <div className="flex flex-col sm:flex-row gap-3">
        <button type="button" onClick={listen} disabled={session.step === 'done'} aria-pressed={listening}
          className={`min-h-[64px] px-8 rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 disabled:opacity-50 ${listening ? 'ring-4 ring-secondary-fixed' : ''}`}>
          <span className="material-symbols-outlined" aria-hidden="true">mic</span>
          {listening ? 'Listening… tap to stop' : voiceOk ? 'Start speaking' : 'Voice unavailable — type below'}
        </button>
        <form className="flex flex-1 gap-2" onSubmit={(e) => { e.preventDefault(); void submit(text); setText(''); }}>
          <label htmlFor="answer" className="sr-only">Your answer</label>
          <input id="answer" value={text} onChange={(e) => setText(e.target.value)} maxLength={300} autoComplete="off" inputMode="text"
            className="flex-1 min-h-[64px] px-5 rounded-full bg-surface-container-lowest shadow-sm font-body-lg text-body-lg" placeholder="Type your answer" />
          <button type="submit" className="min-h-[64px] px-6 rounded-full bg-primary text-on-primary font-label-lg text-label-lg">Send</button>
        </form>
      </div>
      {session.step === 'done' && (
        <button type="button" onClick={() => reset(lang)} className="min-h-[56px] rounded-full bg-surface-container-high font-label-lg text-label-lg">Start again</button>
      )}
      <p className="text-on-surface-variant font-label-sm text-label-sm">Guidance only, based on published scheme rules. Your answers stay in this browser tab and are not stored.</p>
    </div>
  );
}
