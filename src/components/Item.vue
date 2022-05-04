<script setup lang="ts">
import { computed } from 'vue'
import Chip from '@/components/Chip.vue'
import { TrashIcon, PencilIcon } from '@heroicons/vue/outline'
import type { Note2 } from '@/apis/note2'

const props = defineProps<{
  item: Note2
}>()

const id = computed(() => props.item[0])
const note = computed(() => props.item[1])
defineEmits(['remove', 'edit'])
</script>

<template>
  <div class="glass rounded p-5 flex gap-5 items-center">
    <Chip class="flex-none">ID: {{ id }}</Chip>
    <div>
      {{ note }}
    </div>

    <div class="ml-auto flex gap-3">
      <Btn @click="$emit('remove', props.item)">
        <TrashIcon class="h-5 w-5" />
      </Btn>

      <Btn @click="$emit('edit', props.item)">
        <PencilIcon class="h-5 w-5" />
      </Btn>
    </div>
  </div>
</template>
