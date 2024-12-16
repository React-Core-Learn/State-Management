export type Reducer<State, Action> = (state: State, action: Action) => State

export type ListenerCallback = () => void

export interface ActionType<T extends string = string> {
  type: T
}
