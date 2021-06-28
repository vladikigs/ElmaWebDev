import {INIT_APPLICATION} from "./redux/types";

export function createTable(rootReducer, initialState) {
  let state = rootReducer(initialState, INIT_APPLICATION)
  const subscribers = []

  return {
    dispatch(action) {
      state = rootReducer(state, action)
      subscribers.forEach(sub => sub())
    },
    subscribe(callback) {
      subscribers.push(callback)
    },
    getState() {
      return state
    }
  }
}
