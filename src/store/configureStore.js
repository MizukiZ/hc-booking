import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"

// import reducers
import optionReducer from "./reducers/optionReducer"
import settingReducer from "./reducers/settingReducer"
import appointmentReducer from "./reducers/appointmentReducer"
import bookingReducer from "./reducers/bookingReducer"

const rootReducer = combineReducers({
  options: optionReducer,
  settings: settingReducer,
  appointments: appointmentReducer,
  bookingInfo: bookingReducer
})

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk, logger))
}

export default configureStore