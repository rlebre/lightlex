import { Lightning, Router } from '@lightningjs/sdk';

export default class LiveTV extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      h: 1080,
      Lists: {
        x: 300,
        text: {
          text: 'LIVE TV',
          fontSize: 25,
          lineHeight: 55,
          paddingLeft: 0,
          fontStyle: 'bold',
          wordWrap: true
        }
      }
    };
  }

  _active() {
    this.widgets.menu.visible = true;
  }

  _handleLeft() {
    Router.focusWidget('menu');
  }
}
