import type { Reducer, ActionType, ListenerCallback } from './redux.type'
import { ActionTypes } from './redux.utils'

export function createStore<State, Action extends ActionType>(reducer: Reducer<State, Action>) {
  let currentState: State
  let currentListenerId = 0
  let currentListeners: Map<number, ListenerCallback> = new Map()

  const getState = () => ({ ...currentState })

  const dispatch = (action: Action) => {
    currentState = reducer(currentState, action)
    currentListeners.forEach((listener) => listener())
    return action
  }

  const subscribe = (listeners: ListenerCallback) => {
    const listenerId = currentListenerId++
    currentListeners.set(listenerId, listeners)
    currentListeners.forEach((listener) => listener())
    return () => {}
  }

  dispatch({ type: ActionTypes.INIT } as Action)

  return {
    getState,
    dispatch,
    subscribe,
  }
}
