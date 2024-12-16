import { IState } from './core/Component';
import { observable } from './core/observer';

export const store = {
  state: observable<IState>({
    a: 10,
    b: 20,
  }),

  setState(newState: Partial<IState>) {
    for (const [key, value] of Object.entries(newState)) {
      if (!this.state[key]) continue;
      if (this.state[key] !== undefined) {
        this.state[key] = value as number;
      }
    }
  },
};
