import { observable } from './core/observer'

export const store = <State extends Record<string, any> = Record<string, any>>(initialState: State) => {
  const state = observable(initialState)
  return {
    state,
    setState(newState: Partial<State>) {
      for (const [key, value] of Object.entries(newState)) {
        if (!(key in state)) return
        state[key as keyof typeof newState] = value
      }
    },
  }
}
