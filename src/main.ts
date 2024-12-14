import { observable, observe } from './core/observer.ts'

const state = observable({ a: 10, b: 20 })

const rootElement = document.getElementById('app')! as HTMLDivElement

const render = () => {
  rootElement.innerHTML = `
    <p>a + b = ${state.a + state.b}</p>
    <input id="stateA" value="${state.a}" />
    <input id="stateB" value="${state.b}" />
  `

  rootElement.querySelector('#stateA')!.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement
    state.a = Number(target.value)
  })

  rootElement.querySelector('#stateB')!.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement
    state.b = Number(target.value)
  })
}

observe(render)
