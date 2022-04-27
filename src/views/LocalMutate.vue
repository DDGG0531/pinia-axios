<script setup lang="ts">
import Form from '@/components/Form.vue'
import { ref } from 'vue'
import { apiGoogleTranslate } from '@/apis/translate'
import { get } from 'lodash-es'
import { useMutation } from 'vue-query'

let sentence = ref('')
let translated = ref('')
function useGoogleTranslateMutation() {
  return useMutation(apiGoogleTranslate)
}
let { mutateAsync, isLoading } = useGoogleTranslateMutation()

async function handleFormSubmit() {
  try {
    let response = await mutateAsync(sentence.value)
    translated.value = get(response, 'data.data.translations[0].translatedText')
  } catch (error) {
    console.error(error)
  } finally {
    console.log('done')
  }
}
</script>

<template>
  <Form
    @formSubmit="handleFormSubmit"
    :isLoading="isLoading"
    v-model:sentence="sentence"
    :translated="translated"
    :isPinia="false"
  >
  </Form>
</template>
