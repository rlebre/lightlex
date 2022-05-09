import { Lightning, Router } from '@lightningjs/sdk';

export default class Discover extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      h: 1080,
      Lists: {
        x: 300,
        text: {
          text: 'DISCOVER',
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

  _handleBack() {
    Router.back();
  }

  _getFocused() {
    return this.tag('Lists');
  }
}
