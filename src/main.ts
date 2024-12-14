import { createStore } from './core/redux'
import { additionReducer, ACTION_TYPE } from './reducer'

const { getState, dispatch, subscribe } = createStore(additionReducer)

const rootElement = document.getElementById('app')! as HTMLDivElement

const render = () => {
  rootElement.innerHTML = `
    <p>a + b = ${getState().a + getState().b}</p>
    <input id="stateA" value="${getState().a}" />
    <input id="stateB" value="${getState().b}" />
  `

  rootElement.querySelector('#stateA')!.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement
    dispatch({ type: ACTION_TYPE.SET_A, payload: { a: Number(target.value) } })
  })

  rootElement.querySelector('#stateB')!.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement
    dispatch({ type: ACTION_TYPE.SET_B, payload: { b: Number(target.value) } })
  })
}

subscribe(render)
