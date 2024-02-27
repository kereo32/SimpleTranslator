/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react'

type GenericResponse<T> = {
  data : T
  isLoading : boolean
  error : string
  isError : Error | boolean
  fetchData : (body:string) => Promise<void>
  changeLoadState : (state : boolean) => void
}

const useTranslate = <T>(url : string) : GenericResponse<T> => {
  const [data, setData] = useState<T>('Waiting for input.' as T)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isError, setIsError] = useState(false)

  const changeLoadState = (state : boolean) => {
    setIsLoading(state)
  }

  const fetchData = async (body:string) => {
    try {
      const response = await fetch(url,{
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'bb2dad6918msh7f26a2861ae90d9p11ad74jsnf650212480c2',
          'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        },
        body: JSON.stringify([
          {
            Text: body
          }
        ])
      })
      const result = await response.json()
      console.log(result)
      setData(result[0].translations[0].text)
    } catch (error : any) {
      setError(error)
      setIsError(true)
    }
  }

  return {data, isLoading, error, isError, fetchData,changeLoadState}
}


export default useTranslate