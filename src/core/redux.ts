import isPlainObject from '../utils/isPlainObject'
import type { Reducer, ActionType, ListenerCallback } from './redux.type'
import { ActionTypes } from './redux.utils'

export function createStore<State, Action extends ActionType>(reducer: Reducer<State, Action>) {
  let currentState: State
  let currentListenerId = 0
  let currentListeners: Map<number, ListenerCallback> = new Map()

  const getState = () => currentState

  const dispatch = (action: Action) => {
    if (!isPlainObject(action)) {
      throw new Error(`해당 ${action}은 순수 객체가 아니에요! action은 항상 순수 객체여야 합니다.`)
    }

    if (typeof action.type !== 'string') {
      throw new Error(`action type은 반드시 문자열이어야 합니다.`)
    }

    currentState = reducer(currentState, action)
    currentListeners.forEach((listener) => listener())

    return action as Action
  }

  const subscribe = (listenerCallback: ListenerCallback) => {
    if (typeof listenerCallback !== 'function') {
      throw new Error(`subscribe 매개변수는 반드시 함수이어야 합니다.`)
    }

    const listenerId = currentListenerId++
    currentListeners.set(listenerId, listenerCallback)
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
