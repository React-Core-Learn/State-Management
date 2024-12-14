type State = Record<string, any>
type ObserverFn<T> = (data: T) => void

class Store<TState extends State = State> {
  private _state: TState
  private observers: Set<ObserverFn<TState>>

  constructor(state: TState) {
    this._state = state
    this.observers = new Set()
  }

  get state() {
    return { ...this._state }
  }

  setState(newState: State) {
    this._state = { ...this._state, ...newState }
    this.notify()
  }

  subscribe(observer: ObserverFn<TState>) {
    this.observers.add(observer)
  }

  notify() {
    this.observers.forEach((observer) => observer(this._state))
  }
}

interface InitialState {
  a: number
  b: number
}

class Observer<TState extends State> {
  private fn: ObserverFn<TState>

  constructor(fn: ObserverFn<TState>) {
    this.fn = fn
  }

  subscribe(store: Store<TState>) {
    store.subscribe(this.fn)
  }
}

const store = new Store<InitialState>({ a: 10, b: 20 })

const add = new Observer<InitialState>((data) => console.log(`a + b = ${data.a + data.b}`))
const multiple = new Observer<InitialState>((data) => console.log(`a * b = ${data.a * data.b}`))

add.subscribe(store)
multiple.subscribe(store)

store.notify()

store.setState({ a: 100, b: 200 })
