import { Lightning, Router } from '@lightningjs/sdk';

export default class Main extends Lightning.Component {
  static _template() {
    return {
      w: 1980,
      h: 1080,
      Lists: {
        x: 300,
        text: {
          text: 'HOME',
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
    // this.widgets.menu.visible = true;
  }

  _focus() {
    // this.patch({
    //   Lists: {
    //     smooth: { y: [560, { duration: 0.2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' }] }
    //   }
    // });
  }

  _unfocus() {
    // this.patch({
    //   Lists: {
    //     smooth: { y: [600, { duration: 0.4, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' }] }
    //   }
    // });
  }

  _handleLeft() {
    Router.focusWidget('menu');
  }
}
