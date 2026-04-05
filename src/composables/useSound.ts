import { ref } from 'vue'

const isMuted = ref(localStorage.getItem('savegame_mute') === 'true')

class SoundEngine {
  private ctx: AudioContext | null = null

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  playBlip(freq = 880, duration = 0.05, volume = 0.1) {
    if (isMuted.value) return
    this.initCtx()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + duration)

    gain.gain.setValueAtTime(volume, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start()
    osc.stop(this.ctx.currentTime + duration)
  }

  playClick() {
    this.playBlip(440, 0.08, 0.15)
  }

  playHover() {
    this.playBlip(1200, 0.04, 0.06)
  }
}

const engine = new SoundEngine()

export function useSound() {
  const toggleMute = () => {
    isMuted.value = !isMuted.value
    localStorage.setItem('savegame_mute', isMuted.value.toString())
  }

  return {
    isMuted,
    toggleMute,
    playHover: () => engine.playHover(),
    playClick: () => engine.playClick(),
    playBlip: (freq?: number, dur?: number, vol?: number) => engine.playBlip(freq, dur, vol)
  }
}
