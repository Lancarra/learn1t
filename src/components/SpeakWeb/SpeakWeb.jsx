import { useEffect, useMemo, useState } from "react";
import {AiOutlineSound} from "react-icons/ai";

const LANGS = {
    en: "en-US",
    uk: "uk-UA",
    lt: "lt-LT",
};

export default function SpeakWeb({
                                     text,
                                     langKey = "en",   // "en" | "uk" | "lt"
                                     rate = 0.95,
                                     pitch = 1,
                                     volume = 1,
                                     prefer = ["Google", "Microsoft", "Siri"], // порядок предпочтений
                                 }) {
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        if (!("speechSynthesis" in window)) return;
        const load = () => setVoices(window.speechSynthesis.getVoices());
        load();
        window.speechSynthesis.onvoiceschanged = load;
        return () => { window.speechSynthesis.onvoiceschanged = null; };
    }, []);

    const lang = LANGS[langKey] ?? "en-US";

    const voice = useMemo(() => {
        if (!voices.length) return null;

        const byLang = voices.filter(v =>
            (v.lang || "").toLowerCase().startsWith(lang.toLowerCase().slice(0, 2))
        );
        const pool = byLang.length ? byLang : voices;

        for (const p of prefer) {
            const found = pool.find(v => (v.name || "").includes(p));
            if (found) return found;
        }
        return pool[0];
    }, [voices, lang, prefer]);

    const speak = (e) => {
        e?.stopPropagation?.();
        const t = (text || "").trim();
        if (!t) return;

        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(t);
        u.lang = lang;
        u.rate = rate;
        u.pitch = pitch;
        u.volume = volume;
        if (voice) u.voice = voice;
        window.speechSynthesis.speak(u);
    };

    const stop = (e) => {
        e?.stopPropagation?.();
        window.speechSynthesis.cancel();
    };

    return (
        <span style={{ display: "inline-flex", gap: 8 }}>
      <button type="button" onClick={speak} aria-label="Speak"><AiOutlineSound /></button>
      <button type="button" onClick={stop} aria-label="Stop">⏹</button>
    </span>
    );
}
