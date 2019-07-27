import {
  UPDATE_BOOKING_FIRST_NAME,
  UPDATE_BOOKING_LAST_NAME,
  UPDATE_BOOKING_EMAIL,
  UPDATE_BOOKING_PHONE,
  UPDATE_BOOKING_CONTENT,
  UPDATE_BOOKING_OPTION_ID,
  UPDATE_BOOKING_DATETIME
} from "./actionTypes"


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
    datetime: datetime
  }
}

