<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  sentence: string
  translated: string
  isLoading: boolean
  isPinia: boolean
}>()

const emit = defineEmits(['update:sentence', 'formSubmit'])

const sentenceModal = useVModel(props, 'sentence', emit)

function formSubmit() {
  emit('formSubmit')
}
</script>

<template>
  <form @submit.prevent="formSubmit">
    <div class="shadow overflow-hidden sm:rounded-md">
      <div
        class="px-4 py-5 sm:p-6"
        :class="[props.isPinia ? 'bg-green-100' : 'bg-blue-100']"
      >
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-3">
            <label
              for="sentence"
              class="block text-sm font-medium text-gray-700"
              >輸入: {{ props.isPinia ? 'Pinia' : 'Local' }}</label
            >
            <input
              v-model="sentenceModal"
              type="text"
              name="sentence"
              id="sentence"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label
              for="transLatedSentence"
              class="block text-sm font-medium text-gray-700"
              >翻譯結果</label
            >
            <input
              :value="props.translated"
              readonly
              type="text"
              name="transLatedSentence"
              id="transLatedSentence"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <template v-if="props.isLoading">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </template>
          <template v-else> 翻譯 </template>
        </button>
      </div>
    </div>
  </form>
</template>
