import { Lightning, Router } from '@lightningjs/sdk';
import { MovieSummary } from '../../lib/models/movie';
import Item from '../item';

export default class List extends Lightning.Component {
  static _template() {
    return {
      List: {
        w: 800,
        h: 350,
        Wrapper: {}
      }
    };
  }

  set data(data: MovieSummary[]) {
    this.index = 0;
    this.movies = data;
    this.dataLength = data.length;
    const buttons = [];
    for (let i = 0; i < data.length; i++) {
      buttons.push({
        type: Item,
        x: i * (180 + 30),
        item: `https://image.tmdb.org/t/p/w300${data[i].poster_path}`
      });
    }
    this.tag('Wrapper').children = buttons;
    this.fireAncestors('$itemChanged', this.movies[this.index]);
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

  _handleLeft() {
    if (this.index === 0) {
      Router.focusWidget('menu');
    } else {
      this.index -= 1;
    }

    this.repositionWrapper();
    this.fireAncestors('$itemChanged', this.movies[this.index]);
  }

  _handleRight() {
    if (this.index === this.dataLength - 1) {
      this.index = 0;
    } else {
      this.index += 1;
    }

    this.repositionWrapper();
    this.fireAncestors('$itemChanged', this.movies[this.index]);
  }

  _handleEnter() {
    Router.navigate(`movie/${this.movies[this.index].id}`);
  }

  _getFocused() {
    return this.tag('List.Wrapper').children[this.index];
  }
}
