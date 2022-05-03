<script setup lang="ts">
import Form from '@/components/Form.vue'
import { ref } from 'vue'
import { useGoogleTranslateStore } from '@/stores/googleTranslate'
import { storeToRefs } from 'pinia'

let sentence = ref('')
let isLoading = ref(false)

const googleTranslateStore = useGoogleTranslateStore()
const { translated } = storeToRefs(googleTranslateStore)
const { doTranslate } = googleTranslateStore

async function handleFormSubmit() {
  isLoading.value = true
  await doTranslate(sentence.value)
  isLoading.value = false
}
</script>

<template>
  <Form
    @formSubmit="handleFormSubmit"
    :isLoading="isLoading"
    v-model:sentence="sentence"
    :translated="translated"
    :isPinia="true"
  >
  </Form>
</template>
