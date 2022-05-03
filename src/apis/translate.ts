import axios from 'axios'

export const apiGoogleTranslate = (sentence: string) => {
  const encodedParams = new URLSearchParams()
  encodedParams.append('q', sentence)
  encodedParams.append('target', 'zh-TW')
  encodedParams.append('source', 'en')

  const options = {
    method: 'POST',
    url: import.meta.env.VITE_RapidAPI_URL_Google_Translate,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Host': import.meta.env.VITE_RapidAPI_Host_Google_Translate,
      'X-RapidAPI-Key': import.meta.env.VITE_RapidAPI_Key
    },
    data: encodedParams
  }

  return axios.request(options)
}
