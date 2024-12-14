import { observable, observe } from './observer'

export default class Component<
  TElement extends HTMLElement,
  Props extends Record<string, any> = Record<string, any>,
  State extends Record<string, any> = Record<string, any>,
> {
  element: TElement
  props: Props
  private _state: State

  constructor(element: TElement, props?: Props, state?: State) {
    this.element = element
    this.props = props || ({} as Props)
    this._state = state || ({} as State)

    this.setup()
  }

  get state() {
    return { ...this._state }
  }

  set state(newState) {
    this._state = { ...this._state, ...newState }
  }

  setup() {
    this.state = observable<State>(this.initState())
    observe(() => {
      this.render()
      this.setEvent()
      this.mounted()
    })
  }

  initState() {
    return {} as State
  }

  template() {
    return ''
  }

  render() {
    this.element.innerHTML = this.template()
  }

  addEvent(
    eventType: keyof HTMLElementEventMap,
    selector: keyof HTMLElementTagNameMap | string,
    callback: EventListener,
  ) {
    this.element.addEventListener(eventType, (event) => {
      const target = event.target as HTMLElement
      if (target.closest(selector)) {
        callback(event)
      }
    })
  }

  setEvent() {}

  mounted() {}
}
