import {
  FETCH_OPTIONS_DATA
} from "./actionTypes"
import axios from "axios"


const fetchOptionsData = data => {
  return {
    type: FETCH_OPTIONS_DATA,
    options: data
  }
}

export const fetchOptionsDataFromApi = () => {
  // hc api url
  const localhostApi = `http://localhost:3000/api/v1/options`
  const productionApi = 'https://hc-booking.herokuapp.com/api/v1/options'

  const hcApi = process.env.NODE_ENV === "development" ? localhostApi : localhostApi

  return (dispatch) => {
    axios.get(hcApi).then(response => {
      console.log("res", response)
      dispatch(fetchOptionsData(response.data.data))
    })
      .catch(error => {
        throw error
      })
  }
}