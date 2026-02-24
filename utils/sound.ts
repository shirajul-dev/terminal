// Simple audio synthesizer to avoid external assets
const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
let audioCtx: AudioContext | null = null;

const getCtx = () => {
    if (!AudioContextClass) return null;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
    return audioCtx;
}

export const playKeystroke = () => {
  const ctx = getCtx();
  if (!ctx) return;

  const t = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  // Mechanical switch thud imitation - Softened
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(150, t); 
  oscillator.frequency.exponentialRampToValueAtTime(100, t + 0.05);
  
  gainNode.gain.setValueAtTime(0.05, t);
  gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(600, t);

  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(t + 0.05);
};

// Soft and Smooth Tech Typing Sound
export const playTypewriterKey = () => {
    const ctx = getCtx();
    if (!ctx) return;

    const t = ctx.currentTime;
    
    // 1. Tonal Component (Soft high-tech blip)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    
    osc.type = 'sine';
    // Start high, drop fast - classic "blip"
    osc.frequency.setValueAtTime(800, t); 
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.03);
    
    // Very quiet and short envelope
    oscGain.gain.setValueAtTime(0.02, t); 
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    
    osc.start(t);
    osc.stop(t + 0.03);

    // 2. Click Component (Subtle contact sound)
    const noiseBufferSize = ctx.sampleRate * 0.01; // 10ms
    const noiseBuffer = ctx.createBuffer(1, noiseBufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuffer;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1000, t);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.015, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.01);

    noiseSrc.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSrc.start(t);
};

export const playCommandEnter = () => {
    const ctx = getCtx();
    if (!ctx) return;

    const t = ctx.currentTime;
    
    // A distinct "Execute" thud/click, slightly heavier than a keystroke
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square'; // Square wave for a more digital "enter" feel
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.1);
    
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    
    // Lowpass filter to keep it professional and not piercing
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(t);
    osc.stop(t + 0.1);
};

export const playBootBeep = () => {
    const ctx = getCtx();
    if (!ctx) return;
  
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
  
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(120, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
  
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.3);
  };

export const playError = () => {
    const ctx = getCtx();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(110, ctx.currentTime);
    oscillator.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.2);
}

export const playSuccess = () => {
    const ctx = getCtx();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(440, ctx.currentTime);
    oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.2);
}

export const playOutput = () => {
    const ctx = getCtx();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.1);
}

export const playPixelBlip = () => {
    const ctx = getCtx();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(1200 + Math.random() * 800, ctx.currentTime);

    gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1000, ctx.currentTime);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.03);
}

// Improved speech function that sounds ROBOTIC
export const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    const speak = () => {
        // Attempt to resume audio context if suspended
        getCtx(); 
        
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        
        // --- ROBOTIC SETTINGS ---
        // Pitch: Lower values (0.1 - 0.5) sound deep and menacing or flat.
        // Rate: 0.9 - 1.1 gives a steady machine-like pace.
        utterance.pitch = 0.4; 
        utterance.rate = 0.9;
        utterance.volume = 1.0;

        const voices = window.speechSynthesis.getVoices();
        
        // We want a voice that sounds less "human" and more "standard/flat".
        // Often the default system voice (without "Google" or "Microsoft" fancy neural names) 
        // responds best to pitch shifting artifacts which creates the robot effect.
        // However, some "Google US English" voices pitch shift nicely into a robot.
        
        const preferredVoice = voices.find(v => 
            // Try to find a generic or specifically robotic sounding voice if user has one installed
            v.name.toLowerCase().includes('robot') || 
            v.name.toLowerCase().includes('bot') ||
            // Fallback to standard US voices which pitch shift well
            v.name === 'Google US English' ||
            v.lang === 'en-US'
        );

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        window.speechSynthesis.speak(utterance);
    };

    // If voices aren't loaded yet, wait for them
    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', speak, { once: true });
    } else {
        speak();
    }
}