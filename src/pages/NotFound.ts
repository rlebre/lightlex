import { Lightning } from '@lightningjs/sdk';
import Logo from '../components/logo';

export default class Movies extends Lightning.Component {
  static _template() {
    return {
      w: 1980,
      h: 1080,

      Logo: {
        type: Logo
      },

      Description: {
        y: 1080 / 2 + 200,
        x: 1920 / 2,
        mount: 0.5,
        text: {
          text: 'Error 404: Page not found',
          fontSize: 25,
          fontStyle: 'bold'
        }
      }
    };
  }
}
