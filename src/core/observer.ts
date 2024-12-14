type Fn = (...args: any[]) => void
type State = Record<string, any>

let currentObserver: Fn | null = null

export function observe(fn: Fn) {
  currentObserver = fn
  fn()
  currentObserver = null
}

export function observable<T extends State>(state: T) {
  const stateKeys = Object.keys(state)

  stateKeys.forEach((key) => {
    let _value = state[key]
    const observers = new Set() as Set<Fn>

    Object.defineProperty(state, key, {
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

  return state
}
