import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // 1. State
  const count = ref(0)
  const step = ref(1)

  // 2. Getters
  const doubleCount = computed(() => count.value * 2)
  const isNegative = computed(() => count.value < 0)

  // 3. Actions
  function increment() {
    count.value += step.value
  }

  function decrement() {
    count.value -= step.value
  }

  function reset() {
    count.value = 0
  }

  function setStep(newStep) {
    step.value = Number(newStep) || 1
  }

  return {
    count,
    step,
    doubleCount,
    isNegative,
    increment,
    decrement,
    reset,
    setStep
  }
})