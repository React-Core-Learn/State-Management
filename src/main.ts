import { observe } from './core/observer.ts'
import { store } from './store.ts'

const { state, setState } = store({ a: 10, b: 20 })

const rootElement = document.getElementById('app')! as HTMLDivElement

const render = () => {
  rootElement.innerHTML = `
    <p>a + b = ${state.a + state.b}</p>
    <input id="stateA" value="${state.a}" />
    <input id="stateB" value="${state.b}" />
  `

  rootElement.querySelector('#stateA')!.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement
    setState({ a: Number(target.value) })
  })

  rootElement.querySelector('#stateB')!.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement
    setState({ b: Number(target.value) })
  })
}

observe(render)
