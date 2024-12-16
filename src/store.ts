import { createStore } from './core/ReduxStore';

export type TAction = {
  type?: string;
  payload?: any;
};

const initState = {
  a: 10,
  b: 20,
};

export const SET_A = 'SET_A';
export const SET_B = 'SET_B';

export const store = createStore((state = initState, action: TAction = {}) => {
  switch (action.type) {
    case 'SET_A':
      return { ...state, a: action.payload };
    case 'SET_B':
      return { ...state, b: action.payload };
    default:
      return state;
  }
});

export const setA = (payload: number) => ({ type: SET_A, payload });
export const setB = (payload: number) => ({ type: SET_B, payload });
