class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private soundVolume: number = 0.7;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  setVolume(volume: number) {
    this.soundVolume = volume;
  }

  // Helper to create a panner node for spatial panning (based on balloon X coordinates)
  private createPanner(xPosition?: number): AudioNode {
    if (!this.ctx || xPosition === undefined) return this.ctx!.destination;

    try {
      // Create stereo panner node
      const panner = this.ctx.createStereoPanner();
      // Translate screen X coordinates to stereo range [-1.0, 1.0]
      // Assume screen center is roughly 350-400px.
      const normalizedX = Math.max(-1, Math.min(1, (xPosition - 300) / 300));
      panner.pan.setValueAtTime(normalizedX, this.ctx.currentTime);
      panner.connect(this.ctx.destination);
      return panner;
    } catch (e) {
      // Fallback for browsers that do not support StereoPanner
      return this.ctx!.destination;
    }
  }

  playPop(xPos?: number) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const dest = this.createPanner(xPos);

      osc.type = "sine";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(850, now + 0.08);

      gain.gain.setValueAtTime(this.soundVolume * 0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.08);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.error(e);
    }
  }

  playCorrect(xPos?: number) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const dest = this.createPanner(xPos);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.07); // E5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.18); // A5

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(this.soundVolume * 0.45, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.error(e);
    }
  }

  playWrong(xPos?: number) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const dest = this.createPanner(xPos);

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.35);

      gain.gain.setValueAtTime(this.soundVolume * 0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.35);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      console.error(e);
    }
  }

  playLevelUp() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const scale = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5]; 
      scale.forEach((freq, index) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + index * 0.06);

        gain.gain.setValueAtTime(0, now + index * 0.06);
        gain.gain.linearRampToValueAtTime(this.soundVolume * 0.35, now + index * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.06 + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + index * 0.06);
        osc.stop(now + index * 0.06 + 0.22);
      });
    } catch (e) {
      console.error(e);
    }
  }

  playCombo(streak: number) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const baseFreq = 260 + streak * 40;
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 0.16);

      gain.gain.setValueAtTime(this.soundVolume * 0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch (e) {
      console.error(e);
    }
  }

  playClick() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.setValueAtTime(320, now + 0.03);

      gain.gain.setValueAtTime(this.soundVolume * 0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {
      console.error(e);
    }
  }
}

export const gameAudio = new AudioSynthesizer();
export default gameAudio;
