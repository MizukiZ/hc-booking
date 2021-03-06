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
} from "./actionTypes"

import { store } from '../../index'
import { phoneIsValid, emailIsValid } from '../../helper'

export const resetSubmitForm = () => {
  return {
    type: RESET_SUBMIT_FORM
  }
}

export const updateBookingFirstName = firstname => {
  return {
    type: UPDATE_BOOKING_FIRST_NAME,
    firstname: firstname
  }
}

export const updateBookingLastName = lastname => {
  return {
    type: UPDATE_BOOKING_LAST_NAME,
    lastname: lastname
  }
}

export const updateBookingEmail = email => {
  return {
    type: UPDATE_BOOKING_EMAIL,
    email: email
  }
}

export const updateBookingPhone = phone => {
  return {
    type: UPDATE_BOOKING_PHONE,
    phone: phone
  }
}

export const updateBookingContent = content => {
  return {
    type: UPDATE_BOOKING_CONTENT,
    content: content
  }
}

export const updateBookingOptionId = optionId => {
  return {
    type: UPDATE_BOOKING_OPTION_ID,
    optionId: optionId
  }
}

export const updateBookingDateTime = datetime => {
  return {
    type: UPDATE_BOOKING_DATETIME,
    start_at: datetime.start_at,
    end_at: datetime.end_at
  }
}

export const updateSubmitFormError = () => (dispatch) => {
  const { firstname, lastname, email, phone, optionId, start_at, end_at } = store.getState().bookingInfo
  let result = false

  // check the state and set result true or false
  if (
    firstname === "" ||
    lastname === "" ||
    !emailIsValid(email) ||
    !phoneIsValid(phone) ||
    !optionId ||
    !start_at ||
    !end_at) {
    result = true
  }
  return new Promise((resolve, reject) => {

    dispatch({
      type: UPDATE_SUBMIT_FORM_ERROR,
      result: result,
      formCompletedResult: !result // check if the form is completed
    });


    resolve(); // we're done so call resolve.

  });
}

