import Component from './core/Component';

export class App extends Component {
  initState() {
    return {
      a: 10,
      b: 20,
    };
  }

  template(): string {
    const { a, b } = this.state;
    return `
    <input id="stateA" type="number" value="${a}"/>
    <input id="stateB" type="number" value="${b}"/>
    <p>a + b = ${a + b}</p>
    `;
  }

  setEvent(): void {
    const { $el, state } = this;

    $el.querySelector('#stateA')?.addEventListener('input', ({ target }) => {
      if (target && target instanceof HTMLInputElement) {
        state.a = Number(target.value);
      }
    });

    $el.querySelector('#stateB')?.addEventListener('input', ({ target }) => {
      if (target && target instanceof HTMLInputElement) {
        state.b = Number(target.value);
      }
    });
  }
}
