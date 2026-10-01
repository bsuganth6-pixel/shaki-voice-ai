import type { Lang } from './types';

export const LANGS: { code: Lang; label: string; speech: string }[] = [
  { code: 'ta', label: 'தமிழ்', speech: 'ta-IN' },
  { code: 'hi', label: 'हिन्दी', speech: 'hi-IN' },
  { code: 'en', label: 'English', speech: 'en-IN' },
];

type Key =
  | 'welcome' | 'q_gender' | 'q_age' | 'q_incomeLevel' | 'q_state' | 'q_hasExistingConnection'
  | 'q_annualIncome' | 'q_landAcres' | 'retry' | 'pii' | 'eligible' | 'notEligible'
  | 'docs' | 'handoff' | 'safety' | 'restart';

export const STRINGS: Record<Lang, Record<Key, string>> = {
  en: {
    welcome: 'Namaste. I can check two schemes: 1 for free LPG gas (PM Ujjwala), 2 for Tamil Nadu monthly aid (Magalir Urimai). Say or type 1 or 2.',
    q_gender: 'Are you a woman or a man?',
    q_age: 'How old are you?',
    q_incomeLevel: 'Does your family have a BPL ration card? Yes or no.',
    q_state: 'Do you live in Tamil Nadu? Yes or no.',
    q_hasExistingConnection: 'Do you already have an LPG gas connection at home? Yes or no.',
    q_annualIncome: "What is your family's income in one year, in rupees?",
    q_landAcres: 'How many acres of land does your family own? Say 0 if none.',
    retry: 'Sorry, I did not understand. Please answer again, simply.',
    pii: 'Please do not tell me Aadhaar, OTP, PIN or bank numbers. I do not need them. Answer the question only.',
    eligible: 'Good news. You look eligible for {scheme}.',
    notEligible: 'Sorry, you do not look eligible for {scheme} right now. You can ask at your nearest office to be sure.',
    docs: 'Keep these ready: {docs}.',
    handoff: 'Apply only on the official website: {url}',
    safety: 'Never share your OTP or PIN with anyone.',
    restart: 'To check another scheme, press Start again.',
  },
  ta: {
    welcome: 'வணக்கம். நான் இரண்டு திட்டங்களைப் பார்க்கலாம்: 1 இலவச எரிவாயு (உஜ்வலா), 2 தமிழ்நாடு மகளிர் உரிமைத் தொகை. 1 அல்லது 2 என்று சொல்லுங்கள்.',
    q_gender: 'நீங்கள் பெண்ணா, ஆணா?',
    q_age: 'உங்கள் வயது என்ன?',
    q_incomeLevel: 'உங்கள் குடும்பத்திற்கு BPL ரேஷன் அட்டை உள்ளதா? ஆம் அல்லது இல்லை.',
    q_state: 'நீங்கள் தமிழ்நாட்டில் வசிக்கிறீர்களா? ஆம் அல்லது இல்லை.',
    q_hasExistingConnection: 'வீட்டில் ஏற்கனவே எரிவாயு இணைப்பு உள்ளதா? ஆம் அல்லது இல்லை.',
    q_annualIncome: 'உங்கள் குடும்பத்தின் ஒரு வருட வருமானம் எவ்வளவு ரூபாய்?',
    q_landAcres: 'உங்கள் குடும்பத்திற்கு எத்தனை ஏக்கர் நிலம் உள்ளது? இல்லையென்றால் 0 என்று சொல்லுங்கள்.',
    retry: 'மன்னிக்கவும், புரியவில்லை. எளிமையாக மீண்டும் சொல்லுங்கள்.',
    pii: 'ஆதார், OTP, PIN, வங்கி எண் எதையும் சொல்ல வேண்டாம். அவை தேவையில்லை. கேள்விக்கு மட்டும் பதில் சொல்லுங்கள்.',
    eligible: 'நல்ல செய்தி. {scheme} திட்டத்திற்கு நீங்கள் தகுதி பெறலாம்.',
    notEligible: 'மன்னிக்கவும், இப்போது {scheme} திட்டத்திற்கு தகுதி இல்லை எனத் தெரிகிறது. உறுதி செய்ய அருகிலுள்ள அலுவலகத்தில் கேளுங்கள்.',
    docs: 'இவற்றைத் தயாராக வைத்திருங்கள்: {docs}.',
    handoff: 'அதிகாரப்பூர்வ இணையதளத்தில் மட்டும் விண்ணப்பியுங்கள்: {url}',
    safety: 'உங்கள் OTP, PIN ஐ யாரிடமும் பகிர வேண்டாம்.',
    restart: 'வேறு திட்டத்தைப் பார்க்க மீண்டும் தொடங்கு அழுத்தவும்.',
  },
  hi: {
    welcome: 'नमस्ते। मैं दो योजनाएँ जाँच सकती हूँ: 1 मुफ़्त गैस (उज्ज्वला), 2 तमिलनाडु मासिक सहायता। 1 या 2 बोलें।',
    q_gender: 'आप महिला हैं या पुरुष?',
    q_age: 'आपकी उम्र कितनी है?',
    q_incomeLevel: 'क्या आपके परिवार के पास BPL राशन कार्ड है? हाँ या नहीं।',
    q_state: 'क्या आप तमिलनाडु में रहती हैं? हाँ या नहीं।',
    q_hasExistingConnection: 'क्या घर में पहले से गैस कनेक्शन है? हाँ या नहीं।',
    q_annualIncome: 'आपके परिवार की सालभर की आमदनी कितने रुपये है?',
    q_landAcres: 'आपके परिवार के पास कितने एकड़ ज़मीन है? नहीं है तो 0 बोलें।',
    retry: 'माफ़ कीजिए, समझ नहीं आया। कृपया आसान शब्दों में फिर बोलें।',
    pii: 'कृपया आधार, OTP, PIN या बैंक नंबर न बताएँ। इनकी ज़रूरत नहीं है। सिर्फ़ सवाल का जवाब दें।',
    eligible: 'अच्छी ख़बर। आप {scheme} के लिए पात्र लगती हैं।',
    notEligible: 'माफ़ कीजिए, अभी आप {scheme} के लिए पात्र नहीं लगतीं। पक्का करने के लिए नज़दीकी कार्यालय में पूछें।',
    docs: 'ये कागज़ तैयार रखें: {docs}।',
    handoff: 'आवेदन सिर्फ़ आधिकारिक वेबसाइट पर करें: {url}',
    safety: 'अपना OTP या PIN किसी को न बताएँ।',
    restart: 'दूसरी योजना देखने के लिए फिर से शुरू दबाएँ।',
  },
};

export function fill(s: string, vars: Record<string, string>): string {
  return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
}
