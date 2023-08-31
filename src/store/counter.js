import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  const user = {

    username: localStorage.getItem('username') || '',
    password: localStorage.getItem('password') || '',
    access_token: localStorage.getItem('access_token') || '',
    // name: "",
    // password: '',
    // token: '',
  }

  function increment() {
    count.value++
  }

  return { count, doubleCount, increment, user }
})
