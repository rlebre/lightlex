import { Lightning, Router } from '@lightningjs/sdk';
import { Colors } from '../../constants/colors';
import Logo from '../logo';
import MenuItem from './MenuItem';

interface MenuItemInterface {
  label: string;
  route: string;
  icon?: string;
}

export default class Menu extends Lightning.Component {
  static _template() {
    return {
      Wrapper: {
        w: 250,
        h: 1080,
        rect: true,
        color: Colors.DARK_GRAY,

        flex: {
          direction: 'column',
          paddingLeft: 40,
          justifyContent: 'space-between',
          alignContent: 'flex-start',
          wrap: true
        },

        Logo: {
          type: Logo,
          y: 50,
          x: 0,
          w: (w: number) => w - 100,
          h: 30,
          mountX: 0
        },

        MenuItems: {
          w: (w: number) => w - 100,
          h: 30,
          alignSelf: 'stretch',
          Items: {
            flex: {
              direction: 'column',
              alignContent: 'center'
            },
            flexItem: { margin: 50 }
          },
          Focus: {
            rect: true,
            colorLeft: Colors.ORANGE,
            colorRight: Colors.ORANGE,
            h: 6,
            shader: { type: Lightning.shaders.RoundedRectangle, radius: 3 },
            transitions: {
              alpha: { duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' },
              w: { duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' }
            }
          }
        },

        Settings: {
          y: -50,
          text: {
            text: 'Settings',
            fontSize: 25,
            fontStyle: 'bold'
          }
        }
      }
    };
  }

  _init() {
    this._index = 0;
  }

  _setup() {
    this._items = [
      {
        label: 'Home',
        icon: '',
        route: 'home'
      },
      {
        label: 'Live TV',
        icon: '',
        route: 'live'
      },
      {
        label: 'Movies & Shows',
        icon: '',
        route: 'movies'
      },
      {
        label: 'Discover',
        icon: '',
        route: 'discover'
      }
    ] as MenuItemInterface[];

    const items = this._items.map((item: MenuItemInterface) => {
      return {
        type: MenuItem,
        label: item.label,
        selected: false,
        id: item.route,
        flexItem: { marginBottom: 10 }
      };
    });

    this.tag('MenuItems.Items').add(items);
  }

  get activeItem() {
    return this.tag('Items').children[this._index];
  }

  _handleUp() {
    if (this._index > 0) {
      this._select(-1);
    }
  }

  _handleDown() {
    console.log(this._index);
    if (this._index < this.tag('Items').children.length - 1) {
      this._select(1);
    }
  }

  _handleEnter() {
    Router.navigate(`${this.activeItem.id}`, false);
    Router.restoreFocus();
  }

  _focus() {
    this.tag('Focus').w = 0;
    this.tag('Focus').setSmooth('alpha', 1);
    this._animateToSelected();
  }

  _unfocus() {
    this.tag('Focus').setSmooth('alpha', 0);
  }

  _select(direction: number) {
    this._index += direction;
    if (this._index < this.tag('Items').children.length) {
      this._animateToSelected();
    }
  }

  _animateToSelected() {
    this.tag('Focus').patch({
      smooth: { y: this.activeItem.finalY + this.activeItem.finalH - 5, w: this.activeItem.finalW }
    });
  }

  _getFocused() {
    return this.activeItem;
  }

  _onActivated(page: any) {
    const list = this.tag('Items');
    const currentRouteId = page[Router.symbols['route']].toLocaleLowerCase();

    for (let i = 0; i < list.children.length; i++) {
      list.children[i].selected = list.children[i]._id === currentRouteId;
      if (list.children[i]._id === currentRouteId) {
        this._selectedChild = list.children[i];
      }
    }
  }
}
