import { defineStore } from 'pinia'
import { apiGoogleTranslate } from '@/apis/translate.js'
import { get } from 'lodash-es'

export const useGoogleTranslateStore = defineStore({
  id: 'googleTranslate',
  state: () => ({
    translated: ''
  }),
  actions: {
    // 可以帶入多個參數了，我的天
    async doTranslate(sentence: string) {
      const response = await apiGoogleTranslate(sentence)
      this.translated = get(
        response,
        'data.data.translations[0].translatedText'
      )
    }
  }
})
