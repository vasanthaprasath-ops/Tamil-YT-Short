// Generates the whole voice-over as ONE ElevenLabs take (natural flow, even pace) with character timestamps.
//   node vo/tts.mjs
// Reads vo/script.json; writes vo/vo.mp3 and vo/alignment.json (characters + start/end seconds), which
// make-audio.js turns into shot cuts and word-by-word captions.
// Needs ELEVENLABS_API_KEY in the environment (never in a file). Optional: VOICE_ID, MODEL, SPEED (0.7-1.2).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const KEY = process.env.ELEVENLABS_API_KEY;
const VOICE = process.env.VOICE_ID || 'yIFUVClxedWzoMYhk15k';   // Prashant V - Calm, Friendly and Clear (Chennai)
const MODEL = process.env.MODEL || 'eleven_v3';
if (!KEY) { console.error('ELEVENLABS_API_KEY is not set.'); process.exit(1); }

const { segments } = JSON.parse(fs.readFileSync(process.env.SCRIPT || path.join(dir, 'script.json'), 'utf8'));
const text = segments.map(s => s.say || s.text).join(' ');
const settings = { stability: +(process.env.STABILITY ?? 0.5), similarity_boost: 0.75 };   // v3 accepts 0 (creative), 0.5 (natural), 1 (robust)
if (MODEL !== 'eleven_v3') Object.assign(settings, { style: 0.3, use_speaker_boost: true, speed: +(process.env.SPEED || 1.0) });
const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}/with-timestamps?output_format=mp3_44100_128`, {
  method: 'POST',
  headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' },
  body: JSON.stringify({ text, model_id: MODEL, language_code: 'ta', voice_settings: settings }),
});
if (!res.ok) { console.error(`HTTP ${res.status} ${(await res.text()).slice(0, 400)}`); process.exit(1); }
const out = await res.json();
const al = out.normalized_alignment || out.alignment;
if (!al || !al.characters) { console.error('no alignment in the response'); process.exit(1); }
fs.writeFileSync(path.join(dir, 'vo.mp3'), Buffer.from(out.audio_base64, 'base64'));
fs.writeFileSync(path.join(dir, 'alignment.json'), JSON.stringify({ model: MODEL, voice: VOICE, text, chars: al.characters, t0: al.character_start_times_seconds, t1: al.character_end_times_seconds }));
const end = al.character_end_times_seconds[al.character_end_times_seconds.length - 1];
console.log(`vo/vo.mp3: ${end.toFixed(2)} s of speech, ${text.length} characters, model ${MODEL}`);
