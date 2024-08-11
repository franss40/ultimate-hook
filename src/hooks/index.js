import { useState, useEffect } from "react"
import axios from "axios"

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect( () => {
    axios.get(baseUrl)
      .then(response => setResources(response.data))
      .catch(error => { console.error(error); setResources([]) })
  }, [baseUrl])

  const create = async(newObject) => {
    const response = await axios.post(baseUrl, newObject)
    setResources(resources.concat(response.data))
  }

  const service = {
    create,
  }

  return [resources, service]
}


export const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}