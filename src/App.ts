import Component from './core/Component';
import { store } from './store';

const InputA = () => `
<input id="stateA" type="number" value="${store.state.a}" size="5"/>
`;

const InputB = () => `
<input id="stateB" type="number" value="${store.state.b}" size="5"/>
`;

const Calculator = () => `
<p>a + b = ${store.state.a + store.state.b}</p>
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
        store.setState({ a: Number(target.value) });
      }
    });

    $el.querySelector('#stateB')?.addEventListener('change', ({ target }) => {
      if (target && target instanceof HTMLInputElement) {
        store.setState({ b: Number(target.value) });
      }
    });
  }
}
