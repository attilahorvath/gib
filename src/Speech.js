export default class {
  speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.2;
    utterance.pitch = 0.3;

    speechSynthesis.speak(utterance);
  }
}
