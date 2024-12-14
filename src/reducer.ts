interface InitialState {
  a: number
  b: number
}

const initialState = {
  a: 10,
  b: 20,
}

export const ACTION_TYPE = {
  SET_A: 'redux/SET_A',
  SET_B: 'redux/SET_B',
} as const

type Action =
  | { type: typeof ACTION_TYPE.SET_A; payload: Pick<InitialState, 'a'> }
  | { type: typeof ACTION_TYPE.SET_B; payload: Pick<InitialState, 'b'> }

export const additionReducer = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    case ACTION_TYPE.SET_A:
      return { ...state, a: action.payload.a }

    case ACTION_TYPE.SET_B:
      return { ...state, b: action.payload.b }

    default:
      return state
  }
}
