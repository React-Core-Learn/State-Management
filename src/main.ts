type State = Record<string, any>
type ObserverFn<T> = (...args: T[]) => void

interface InitialState {
  a: number
  b: number
}

function observable<TState extends State = State>(initialState: TState) {
  Object.keys(initialState).forEach((key) => {
    let _value = initialState[key]
    const observers = new Set() as Set<ObserverFn<TState>>

    Object.defineProperty(initialState, key, {
      get() {
        if (currentObserver) {
          observers.add(currentObserver)
        }

        return _value
      },
      set(value) {
        _value = value
        observers.forEach((observer) => observer())
      },
    })
  })

  return initialState
}

let currentObserver: null | (() => void) = null

function observer(fn: () => void) {
  currentObserver = fn
  fn()
  currentObserver = null
}

// a를 읽을 때 a가 observers에 등록해야함.

const store = observable<InitialState>({ a: 10, b: 20 })

observer(() => console.log(`a = ${store.a}`))
observer(() => console.log(`b = ${store.b}`))
observer(() => console.log(`a + b = ${store.a} + ${store.b}`))
observer(() => console.log(`a * b = ${store.a} + ${store.b}`))
observer(() => console.log(`a - b = ${store.a} + ${store.b}`))

store.a = 100

store.b = 200
