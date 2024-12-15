import { observe, observable } from './core/observer';

const state = observable({
  a: 10,
  b: 20,
});

const $app = document.querySelector('#app');

const render = () => {
  if ($app) {
    $app.innerHTML = `
    <p>a + b = ${state.a + state.b}</p>
    <input id="stateA" type="number" value="${state.a}"/>
    <input id="stateB" type="number" value="${state.b}"/>
    `;

    $app.querySelector('#stateA')?.addEventListener('input', ({ target }) => {
      if (target && target instanceof HTMLInputElement) {
        state.a = Number(target.value);
      }
    });

    $app.querySelector('#stateB')?.addEventListener('input', ({ target }) => {
      if (target && target instanceof HTMLInputElement) {
        state.b = Number(target.value);
      }
    });
  }
};

observe(render);
