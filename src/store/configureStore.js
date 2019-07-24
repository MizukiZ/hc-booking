import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"

// import reducers
import optionReducer from "./reducers/optionReducer"

const rootReducer = combineReducers({
  options: optionReducer
})

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk, logger))
}

export default configureStore