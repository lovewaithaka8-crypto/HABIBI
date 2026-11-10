// Web Audio API ambient romance synthesizer & sound effects

class RomanticAudioController {
  private ctx: AudioContext | null = null;
  private isPlayingMusic = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a gentle bell / harp note
  private playSoftNote(freq: number, duration: number = 2.2, startTime?: number) {
    if (!this.ctx || !this.masterGain) return;
    const t = startTime ?? this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    // Warm envelope
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.08, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    // Filter for mellow warm acoustic tone
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, t);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + duration);
  }

  public toggleMusic(): boolean {
    this.initContext();
    if (this.isPlayingMusic) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlayingMusic;
  }

  public startMusic() {
    this.initContext();
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    // Chord progressions: Cmaj9 -> Am9 -> Fmaj7 -> G6
    const chords = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9 (C, E, G, B, D)
      [220.00, 261.63, 329.63, 392.00, 493.88], // Am9 (A, C, E, G, B)
      [174.61, 261.63, 329.63, 349.23, 440.00], // Fmaj7 (F, C, E, F, A)
      [196.00, 246.94, 293.66, 392.00, 440.00], // G6 (G, B, D, G, A)
    ];

    let chordIdx = 0;
    const playArpeggio = () => {
      if (!this.isPlayingMusic || !this.ctx) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      const now = this.ctx.currentTime;
      currentChord.forEach((freq, i) => {
        this.playSoftNote(freq, 3.2, now + i * 0.45);
      });
    };

    playArpeggio();
    this.intervalId = window.setInterval(playArpeggio, 3600);
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Play sparkling chime sound on heart / rose interaction
  public playSparkle() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + i * 0.06);
        gain.gain.setValueAtTime(0.001, t + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.05, t + i * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.06 + 0.5);
        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start(t + i * 0.06);
        osc.stop(t + i * 0.06 + 0.5);
      });
    } catch {
      // AudioContext policy fallback
    }
  }

  // Play rose shower sound
  public playRoseChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;
      const arpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      arpeggio.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + i * 0.08);
        gain.gain.setValueAtTime(0.001, t + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.04, t + i * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.08 + 0.6);
        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start(t + i * 0.08);
        osc.stop(t + i * 0.08 + 0.6);
      });
    } catch {
      // Audio fallback
    }
  }
}

export const romanticAudio = new RomanticAudioController();
