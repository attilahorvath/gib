export default class {
  constructor() {
    this.context = new AudioContext();
  }

  speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.2;
    utterance.pitch = 0.3;

    // speechSynthesis.speak(utterance);
  }

  play(type, startFrequency, finalFrequency, duration) {
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(
      startFrequency, this.context.currentTime
    );
    oscillator.frequency.exponentialRampToValueAtTime(
      finalFrequency, this.context.currentTime + duration
    );

    gain.gain.setValueAtTime(0.2, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01, this.context.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(this.context.destination);

    oscillator.start();
    oscillator.stop(this.context.currentTime + duration);
  }
}
