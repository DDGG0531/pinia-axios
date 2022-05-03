import axios from 'axios'

type Note2_List = Array<[number, string]>

export const apiNote2_List: () => Promise<Note2_List> = () => {
  const options = {
    method: 'GET',
    url: `${import.meta.env.VITE_RapidAPI_URL_Note2}/0`,
    headers: {
      'X-RapidAPI-Host': import.meta.env.VITE_RapidAPI_Host_Note2,
      'X-RapidAPI-Key': import.meta.env.VITE_RapidAPI_Key
    }
  }

  return axios.request(options).then(res => res.data)
}
