import { observable, observe } from './observer';

export type TComponentData = Record<string, any>;

export interface IState {
  [key: string]: number;
}

export default class Component<
  State extends TComponentData = IState,
  Props = TComponentData,
> {
  state!: State;
  props: Props;
  $el: HTMLElement;

  constructor($el: HTMLElement, props: Props) {
    this.$el = $el;
    this.props = props;
    this.setup();
  }

  setup() {
    this.state = observable(this.initState()) as State;
    observe(() => {
      this.render();
      this.setEvent();
      this.mounted();
    });
  }

  initState() {
    return {};
  }
  template() {
    return '';
  }
  render() {
    this.$el.innerHTML = this.template();
  }
  setEvent() {}
  mounted() {}
}
