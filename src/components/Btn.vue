<script setup lang="ts">
import { ref } from 'vue'
import { useMotion } from '@vueuse/motion'
import type { MotionVariants } from '@vueuse/motion'

// eslint-disable-next-line
const { initMoveUp = false, tapped = true } = defineProps<{
  initMoveUp?: boolean
  tapped?: boolean
}>()

const button = ref<HTMLElement>()

const variants = ref<MotionVariants>({
  initial: initMoveUp
    ? {
        opacity: 0,
        y: 100
      }
    : undefined,
  enter: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  tapped: tapped
    ? {
        scale: 1.2
      }
    : undefined
})

const motionInstance = useMotion(button, variants)
</script>

<template>
  <button
    ref="button"
    v-motion="motionInstance"
    class="rounded inline-flex p-3 items-center justify-center glass"
  >
    <slot></slot>
  </button>
</template>
