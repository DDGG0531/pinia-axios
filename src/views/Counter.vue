<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const counterStore = useCounterStore()
const { counter, doubleCount } = storeToRefs(counterStore)
const { addCounter } = counterStore
</script>

<template>
  <main class="text-red-400">Counter: {{ counter }}</main>
  <main class="text-red-400">Double Counter: {{ doubleCount }}</main>

  <button class="rounded border p-3 bg-red-100" @click="addCounter(1, '笑死')">
    加一
  </button>
</template>
