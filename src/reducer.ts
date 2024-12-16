/**
 * Object 사용 예시
 */

// interface InitialState {
//   a: number
//   b: number
// }

// const initialState = {
//   a: 10,
//   b: 20,
// }

// export const ACTION_TYPE = {
//   SET_A: 'redux/SET_A',
//   SET_B: 'redux/SET_B',
// } as const

// type Action =
//   | { type: typeof ACTION_TYPE.SET_A; payload: Pick<InitialState, 'a'> }
//   | { type: typeof ACTION_TYPE.SET_B; payload: Pick<InitialState, 'b'> }

// export const additionReducer = (state: InitialState = initialState, action: Action): InitialState => {
//   switch (action.type) {
//     case ACTION_TYPE.SET_A:
//       return { ...state, a: action.payload.a }

//     case ACTION_TYPE.SET_B:
//       return { ...state, b: action.payload.b }

//     default:
//       return state
//   }
// }

/**
 * Number 사용 예시
 */
const initialState = 0

export const ACTION_TYPE = {
  INCREASE: 'increase',
  DECREASE: 'decrease',
} as const

type Action = { type: typeof ACTION_TYPE.INCREASE } | { type: typeof ACTION_TYPE.DECREASE }

export const additionReducer = (state: number = initialState, action: Action): number => {
  switch (action.type) {
    case ACTION_TYPE.INCREASE:
      return state + 1

    case ACTION_TYPE.DECREASE:
      return state <= 0 ? 0 : state - 1

    default:
      return state
  }
}
