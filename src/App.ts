import { Router, Utils } from '@lightningjs/sdk';
import { Menu, MenuWithBackButton } from './components/widgets';
import { Colors } from './constants/colors';
import routes from './router/routes';

export default class App extends Router.App {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }];
  }

  static _template() {
    return {
      x: 0,
      Background: {
        w: 1920,
        h: 1080,
        z: -100,
        rect: true,
        color: Colors.BACKGROUND
      },
      Widgets: {
        Menu: {
          type: Menu,
          zIndex: 99,
          visible: true
        },
        MenuWithBackButton: {
          type: MenuWithBackButton,
          x: 50,
          y: 50,
          zIndex: 99,
          visible: false
        }
      },
      ...super._template()
    };
  }

  _handleAppClose() {
    // const dialog = this.tag('Dialog');
    // dialog.open({
    //   header: "Closing App?!", message: "Are you sure you want to close the app?", actions: [
    //     {
    //       label: 'No',
    //       action: () => {
    //         dialog.close();
    //       }
    //     },
    //     {
    //       label: 'Yes',
    //       action: () => {
    //         this.application.closeApp();
    //       }
    //     }
    //   ]
    // });
  }

  _setup() {
    Router.startRouter(routes, this);
  }
}
