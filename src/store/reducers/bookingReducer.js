import {
  UPDATE_BOOKING_FIRST_NAME,
  UPDATE_BOOKING_LAST_NAME,
  UPDATE_BOOKING_EMAIL,
  UPDATE_BOOKING_PHONE,
  UPDATE_BOOKING_CONTENT,
  UPDATE_BOOKING_OPTION_ID,
  UPDATE_BOOKING_DATETIME,
  UPDATE_SUBMIT_FORM_ERROR,
  RESET_SUBMIT_FORM
} from "../actions/actionTypes"

let initialBookingState =
{
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  content: '',
  optionId: null,
  start_at: null,
  end_at: null,
  submitError: false,
  formIsCompleted: false

}

export default function optionReducer(state = initialBookingState, action) {
  switch (action.type) {
    case UPDATE_BOOKING_FIRST_NAME:
      return {
        ...state, firstname: action.firstname
      }
    case UPDATE_BOOKING_LAST_NAME:
      return {
        ...state, lastname: action.lastname
      }
    case UPDATE_BOOKING_EMAIL:
      return {
        ...state, email: action.email
      }
    case UPDATE_BOOKING_PHONE:
      return {
        ...state, phone: action.phone
      }
    case UPDATE_BOOKING_CONTENT:
      return {
        ...state, content: action.content
      }
    case UPDATE_BOOKING_OPTION_ID:
      return {
        ...state, optionId: action.optionId
      }
    case UPDATE_BOOKING_DATETIME:
      return {
        ...state, start_at: action.start_at, end_at: action.end_at
      }
    case UPDATE_SUBMIT_FORM_ERROR:
      return {
        ...state, submitError: action.result, formIsCompleted: action.formCompletedResult
      }
    case RESET_SUBMIT_FORM:
      return {
        ...initialBookingState
      }
    default:
      return state
  }
}