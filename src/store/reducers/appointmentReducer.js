import {
  FETCH_APPOINTMENTS_DATA
} from "../actions/actionTypes"

let initialOptionState = null

export default function optionReducer(state = initialOptionState, action) {
  switch (action.type) {
    case FETCH_APPOINTMENTS_DATA:
      return action.appointments
    default:
      return state
  }
}