import {
  FETCH_OPTIONS_DATA
} from "../actions/actionTypes"

let initialOptionState = null

export default function optionReducer(state = initialOptionState, action) {
  switch (action.type) {
    case FETCH_OPTIONS_DATA:
      return action.options
    default:
      return state
  }
}