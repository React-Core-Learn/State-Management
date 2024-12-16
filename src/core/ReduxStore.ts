import { TAction } from '../store';
import { observable } from './observer';

interface IStateA {
  a: number;
  b: number;
}

interface IStateB {
  b: any;
  a: number;
}

type IReducerState =
  | (IStateA & { [key: string]: any })
  | (IStateB & { [key: string]: any });

interface IReducer {
  (state?: IReducerState, action?: TAction): IReducerState;
}

export const createStore = (reducer: IReducer) => {
  const initialState: IReducerState = reducer();
  const state = observable(initialState);

  const frozenState: { [key: string]: any } = {};
  Object.keys(state).forEach((key) => {
    Object.defineProperty(frozenState, key, {
      get: () => state[key],
    });
  });

  const dispatch = (action: TAction) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      if (key in state) {
        state[key] = value;
      }
    }
  };

  const getState = () => frozenState;

  return { getState, dispatch };
};
