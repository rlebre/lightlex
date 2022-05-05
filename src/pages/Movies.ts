import { Lightning } from '@lightningjs/sdk';

export default class Movies extends Lightning.Component {
  static _template() {
    return {
      w: 1980,
      h: 1080,
      text: {
        text: 'MOVIES',
        fontSize: 25,
        lineHeight: 55,
        paddingLeft: 0,
        fontStyle: 'bold',
        wordWrap: true
      }
    };
  }
}
