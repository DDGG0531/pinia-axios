<script setup lang="ts">
import Chip from '@/components/Chip.vue'
import { TrashIcon, PencilIcon } from '@heroicons/vue/outline'

const props = defineProps<{
  id: number
  note: string
}>()
</script>

<template>
  <div class="glass rounded p-5 flex gap-5 items-center">
    <Chip class="flex-none">ID: {{ props.id }}</Chip>
    <div>
      {{ props.note }}
    </div>

    <div class="ml-auto flex gap-3">
      <Btn>
        <TrashIcon class="h-5 w-5" />
      </Btn>

      <Btn>
        <PencilIcon class="h-5 w-5" />
      </Btn>
    </div>
  </div>
</template>
