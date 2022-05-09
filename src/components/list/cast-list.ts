import { Lightning, Router } from '@lightningjs/sdk';
import { Cast } from '../../lib/models/credits';
import Item from '../item/cast-item';

export default class CastList extends Lightning.Component {
  static _template() {
    return {
      List: {
        w: 800,
        Wrapper: {}
      }
    };
  }

  repositionWrapper() {
    const wrapper = this.tag('Wrapper');
    const sliderW = this.tag('List').w;
    const currentWrapperX = wrapper.transition('x').targetvalue || wrapper.x;
    const currentFocus = wrapper.children[this.index];
    const currentFocusX = currentFocus.x + currentWrapperX;
    const currentFocusOuterWidth = currentFocus.x + currentFocus.w;

    if (currentFocusX < 0) {
      wrapper.setSmooth('x', -currentFocus.x);
    } else if (currentFocusOuterWidth > sliderW) {
      wrapper.setSmooth('x', sliderW - currentFocusOuterWidth);
    }
  }

  set castData(data: Cast[]) {
    this.index = 0;
    this.cast = data;
    this.dataLength = data.length;
    this.tag('Wrapper').children = this.cast
      .filter((item: Cast) => item.profile_path !== null)
      .map((item: Cast, i: number) => ({
        type: Item,
        x: i * (100 + 30),
        item
      }));

    this.fireAncestors('$itemChanged', this.cast[this.index]);
  }

  _handleLeft() {
    if (this.index === 0) {
      Router.focusWidget('MenuWithBackButton');
    } else {
      this.index -= 1;
    }

    this.repositionWrapper();
    this.fireAncestors('$itemChanged', this.cast[this.index]);
  }

  _handleRight() {
    if (this.index === this.dataLength - 1) {
      this.index = 0;
    } else {
      this.index += 1;
    }

    this.repositionWrapper();
    this.fireAncestors('$itemChanged', this.cast[this.index]);
  }

  _handleBack() {
    Router.back();
  }

  _getFocused() {
    return this.tag('List.Wrapper').children[this.index];
  }
}
