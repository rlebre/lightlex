import { Img, Lightning } from '@lightningjs/sdk';
import { Cast } from '../../lib/models/credits';

export default class CastItem extends Lightning.Component {
  static _template() {
    return {
      w: 100,
      h: 100,

      Image: {
        texture: '',
        w: (w: number) => w,
        h: (h: number) => h,
        rtt: true,
        shader: { type: Lightning.shaders.RoundedRectangle, radius: 50 }
      },

      Focus: {
        y: (h: number) => h + 8,
        x: (w: number) => w / 2,
        w: 150,
        mountX: 0.5,
        text: {
          text: '',
          fontSize: 14,
          wordWrap: true,
          textAlign: 'center'
        }
      }
    };
  }

  set item(cast: Cast) {
    this._cast = cast;
    this.patch({
      Image: { texture: Img(`https://image.tmdb.org/t/p/w300${cast.profile_path}`).contain(100, 100) }
    });
  }

  _focus() {
    this.patch({
      Focus: { text: { text: `${this._cast.name} as ${this._cast.character}` } },
      smooth: { scale: 1.25 }
    });
  }

  _unfocus() {
    this.patch({
      Focus: { text: { text: '' } },
      smooth: { scale: 1.0 }
    });
  }
}
