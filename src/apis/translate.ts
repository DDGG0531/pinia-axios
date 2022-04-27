import axios from 'axios'

export const apiGoogleTranslate = (sentence: string) => {
  const encodedParams = new URLSearchParams()
  encodedParams.append('q', sentence)
  encodedParams.append('target', 'zh-TW')
  encodedParams.append('source', 'en')

  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Host': import.meta.env.VITE_RapidAPI_Host,
      'X-RapidAPI-Key': import.meta.env.VITE_RapidAPI_Key
    },
    data: encodedParams
  }

  return axios.request(options)
}
