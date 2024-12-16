import Component from './core/Component';
import { store, setA, setB } from './store';

const InputA = () => `
<input id="stateA" type="number" value="${store.getState().a}" size="5"/>
`;

const InputB = () => `
<input id="stateB" type="number" value="${store.getState().b}" size="5"/>
`;

const Calculator = () => `
<p>a + b = ${store.getState().a + store.getState().b}</p>
`;

export class App extends Component {
  template(): string {
    return `
    ${InputA()}
    ${InputB()}
    ${Calculator()}
    `;
  }

  setEvent(): void {
    const { $el } = this;

    $el.querySelector('#stateA')?.addEventListener('change', ({ target }) => {
      if (target && target instanceof HTMLInputElement) {
        store.dispatch(setA(Number(target.value)));
      }
    });

    $el.querySelector('#stateB')?.addEventListener('change', ({ target }) => {
      if (target && target instanceof HTMLInputElement) {
        store.dispatch(setB(Number(target.value)));
      }
    });
  }
}
