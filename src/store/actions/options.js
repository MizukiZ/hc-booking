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
  const hcApi = `http://hc-booking.herokuapp.com/api/v1/options`

  return (dispatch) => {
    axios.get(hcApi).then(response => {
      dispatch(fetchOptionsData(response.data.data))
    })
      .catch(error => {
        throw error
      })
  }
}