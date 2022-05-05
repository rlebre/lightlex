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
      Background: {
        w: 1920,
        h: 1080,
        z: -100,
        rect: true,
        color: Colors.BACKGROUND
      },
      ...super._template(),
      Widgets: {
        Menu: {
          type: Menu,
          zIndex: 99,
          visible: false
        },
        MenuWithBackButton: {
          type: MenuWithBackButton,
          x: 68,
          y: 30,
          zIndex: 99,
          visible: true
        }
      }
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
