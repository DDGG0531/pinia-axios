import axios from 'axios'

export type Note2 = [number, string]
export type Note2_List = Array<Note2>

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

export const apiNote2_Delete: (id: number) => Promise<any> = (id: number) => {
  const options = {
    method: 'DELETE',
    url: `${import.meta.env.VITE_RapidAPI_URL_Note2}/${id}`,
    headers: {
      'X-RapidAPI-Host': import.meta.env.VITE_RapidAPI_Host_Note2,
      'X-RapidAPI-Key': import.meta.env.VITE_RapidAPI_Key
    }
  }

  return axios.request(options)
}

export const apiNote2_Create: (note: string) => Promise<any> = (
  note: string
) => {
  console.log('新增', note)
  const options = {
    method: 'POST',
    url: `${import.meta.env.VITE_RapidAPI_URL_Note2}/`,
    headers: {
      'X-RapidAPI-Host': import.meta.env.VITE_RapidAPI_Host_Note2,
      'X-RapidAPI-Key': import.meta.env.VITE_RapidAPI_Key
    },
    data: {
      note
    }
  }

  return axios.request(options)
}

export const apiNote2_Edit: (item: Note2) => Promise<any> = (item: Note2) => {
  const [id, note] = item
  console.log('修改', item)

  const options = {
    method: 'PUT',
    url: `${import.meta.env.VITE_RapidAPI_URL_Note2}/${id}`,
    headers: {
      'X-RapidAPI-Host': import.meta.env.VITE_RapidAPI_Host_Note2,
      'X-RapidAPI-Key': import.meta.env.VITE_RapidAPI_Key
    },
    data: {
      note
    }
  }

  return axios.request(options)
}
