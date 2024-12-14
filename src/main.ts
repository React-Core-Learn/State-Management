import { createStore } from './core/redux'
import { additionReducer, ACTION_TYPE } from './reducer'

const { getState, dispatch, subscribe } = createStore(additionReducer)

const rootElement = document.getElementById('app')! as HTMLDivElement

// Todo: 상태가 객체일 때
// const render = () => {
//   rootElement.innerHTML = `
//     <p>a + b = ${getState().a + getState().b}</p>
//     <input id="stateA" value="${getState().a}" />
//     <input id="stateB" value="${getState().b}" />
//   `

//   rootElement.querySelector('#stateA')!.addEventListener('change', (event) => {
//     const target = event.target as HTMLInputElement
//     dispatch({ type: ACTION_TYPE.SET_A, payload: { a: Number(target.value) } })
//   })

//   rootElement.querySelector('#stateB')!.addEventListener('change', (event) => {
//     const target = event.target as HTMLInputElement
//     dispatch({ type: ACTION_TYPE.SET_B, payload: { b: Number(target.value) } })
//   })
// }

// Todo: 상태가 number 일 때
const render = () => {
  rootElement.innerHTML = `
    <p>${getState()}</p>
    <button id="increase">+1</button>
    <button id="decrease">-1</button>
  `

  rootElement.querySelector('#increase')!.addEventListener('click', () => dispatch({ type: ACTION_TYPE.INCREASE }))
  rootElement.querySelector('#decrease')!.addEventListener('click', () => dispatch({ type: ACTION_TYPE.DECREASE }))
}

subscribe(render)
