import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: 0
  }),
  getters: {
    doubleCount: state => state.counter * 2
  },
  actions: {
    // 可以帶入多個參數了，我的天
    addCounter(num: number, string: string) {
      console.log('string', string)
      this.counter += num
    }
  }
})
