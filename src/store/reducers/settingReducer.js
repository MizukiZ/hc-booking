import {
  FETCH_ADMIN_SETTINGS_DATA
} from "../actions/actionTypes"

let initialOptionState = null

export default function optionReducer(state = initialOptionState, action) {
  switch (action.type) {
    case FETCH_ADMIN_SETTINGS_DATA:
      return action.settings
    default:
      return state
  }
}