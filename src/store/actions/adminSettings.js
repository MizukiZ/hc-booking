import {
  FETCH_ADMIN_SETTINGS_DATA
} from "./actionTypes"
import axios from "axios"


const fetchSettingsData = data => {
  return {
    type: FETCH_ADMIN_SETTINGS_DATA,
    settings: data
  }
}

export const fetchSettingsDataFromApi = () => {
  // hc api url
  const localhostApi = `http://localhost:3000/api/v1/settings`
  const productionApi = 'https://hc-booking-api.herokuapp.com/api/v1/settings'

  const hcApi = process.env.NODE_ENV === "development" ? localhostApi : productionApi

  return (dispatch) => {
    axios.get(hcApi).then(response => {
      console.log("res", response)
      dispatch(fetchSettingsData(response.data.data))
    })
      .catch(error => {
        throw error
      })
  }
}