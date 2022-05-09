import { Img, Lightning, Router } from '@lightningjs/sdk';
import List from '../components/list';
import { MovieSummary } from '../lib/models/movie';
import { TvShowSummary } from '../lib/models/tvShow';

export default class Main extends Lightning.Component {
  static _template() {
    return {
      w: 1920 - 150,
      h: 1080,
      x: 150,

      Thumbnail: {
        x: (w: number) => w * 0.4,
        alpha: 1,
        texture: '',
        shader: {
          type: Lightning.shaders.FadeOut,
          left: 500,
          bottom: 300
        },
        transitions: {
          alpha: {
            duration: 1000
          }
        }
      },

      Metadata: {
        y: 150,
        Title: {
          text: {
            text: 'LIVE TV',
            fontSize: 30,
            fontStyle: 'bold',
            wordWrap: true
          }
        },

        Year: {
          y: (h: number) => h + 55,
          text: {
            text: '',
            fontSize: 25,
            lineHeight: 55,
            paddingLeft: 0,
            fontStyle: 'bold',
            wordWrap: true
          }
        },

        Rate: {
          y: (h: number) => h + 55,
          x: 120,
          text: {
            text: '',
            fontSize: 25,
            lineHeight: 55,
            paddingLeft: 0,
            fontStyle: 'bold',
            wordWrap: true
          }
        },

        Overview: {
          y: (h: number) => h + 130,
          w: 800,
          text: {
            text: '',
            fontSize: 23,
            lineHeight: 40,
            wordWrap: true
          }
        }
      },

      MovieList: {
        y: (h: number) => h - 350,
        type: List,

        Title: {
          y: -75,
          text: {
            text: 'MOST POPULAR',
            fontSize: 35,
            fontStyle: 'bold'
          }
        }
      }
    };
  }

  $itemChanged(item: MovieSummary & TvShowSummary) {
    const thumbnail = this.tag('Thumbnail');

    this._hideAnimation = thumbnail.setSmooth('alpha', 0.01, { duration: 0.5 });

    thumbnail.on('txLoaded', () => {
      thumbnail.setSmooth('alpha', 1, { duration: 1 });
    });

    thumbnail.patch({
      texture: Img(`https://image.tmdb.org/t/p/original${item.backdrop_path}`).contain(1920 * 0.6, 1080 * 0.6)
    });

    this.tag('Metadata').patch({
      Title: { text: { text: item.title || item.name } },
      Year: { text: { text: new Date(item.release_date || item.first_air_date).getFullYear() } },
      Rate: { text: { text: item.vote_average } },
      Overview: { text: { text: item.overview } }
    });
  }

  showPlaceholder() {
    this.tag('Thumbnail').texture = Img('/images/lightlex.png').contain(1920 * 0.6, 1080 * 0.6);
  }

  set tmdbData(data: MovieSummary[]) {
    this.tag('MovieList').data = data;
  }

  _handleLeft() {
    Router.back();
  }

  _getFocused() {
    return this.tag('MovieList');
  }

  _active() {
    // TODO figure out why the back button turns the x to 0
    //console.log(this.x);
    this.patch({ x: 150 });
  }
}
