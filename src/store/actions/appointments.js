import {
  FETCH_APPOINTMENTS_DATA
} from "./actionTypes"
import axios from "axios"


const fetchAppointmentsData = data => {
  return {
    type: FETCH_APPOINTMENTS_DATA,
    appointments: data
  }
}

export const fetchAppointmentsDataFromApi = () => {
  // hc api url
  const localhostApi = `http://localhost:3000/api/v1/appointments`
  const productionApi = 'https://hc-booking-api.herokuapp.com/api/v1/appointments'

  const hcApi = process.env.NODE_ENV === "development" ? localhostApi : productionApi

  return (dispatch) => {
    axios.get(hcApi).then(response => {
      dispatch(fetchAppointmentsData(response.data.data))
    })
      .catch(error => {
        throw error
      })
  }
}