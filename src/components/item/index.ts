import { Lightning } from '@lightningjs/sdk';

export default class Item extends Lightning.Component {
  static _template() {
    return {
      w: 180,
      h: 270,

      Image: {
        src: '',
        x: 7.5,
        y: 7.5,
        w: (w: number) => w,
        h: (h: number) => h,
        rtt: true,
        shader: { type: Lightning.shaders.RoundedRectangle, radius: 10 }
      },

      Focus: {
        w: (w: number) => w + 15,
        h: (h: number) => h + 15,
        rect: true,
        alpha: 0,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          stroke: 4,
          strokeColor: 0xffffffff,
          fillColor: 0x00ffffff,
          radius: 15,
          blend: 1
        }
      }
    };
  }

  set item(src: string) {
    this.patch({
      Image: { src }
    });
  }

  _focus() {
    this.patch({
      Focus: { smooth: { alpha: 1 } },
      smooth: { scale: 1.1 }
    });
  }

  _unfocus() {
    this.patch({
      Focus: { smooth: { alpha: 0 } },
      smooth: { scale: 1.0 }
    });
  }
}
