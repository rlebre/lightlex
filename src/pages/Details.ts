import { Img, Lightning, Router } from '@lightningjs/sdk';
import CastList from '../components/list/cast-list';
import { DATE_FORMAT } from '../constants/date-format';
import { Credits } from '../lib/models/credits';
import { Movie } from '../lib/models/movie';
import { formatDuration } from '../lib/utils/format';

export default class Discover extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      h: 1080,

      Background: {
        alpha: 0.6,
        texture: '',
        shader: {
          type: Lightning.shaders.FadeOut,
          fade: [300, 150]
        },
        transitions: {
          alpha: {
            duration: 1000
          }
        }
      },

      Thumbnail: {
        y: 300,
        x: (w: number) => w * 0.7,
        alpha: 0.01,
        texture: '',
        shader: { type: Lightning.shaders.RoundedRectangle, radius: 20 }
      },

      Metadata: {
        x: 250,
        y: 200,
        Title: {
          text: {
            text: '',
            fontSize: 45,
            fontStyle: 'bold'
          }
        },

        YearGender: {
          y: 60,
          text: {
            text: '',
            fontSize: 20,
            fontStyle: 'bold'
          }
        },

        Duration: {
          y: 90,
          text: {
            text: '',
            fontSize: 20,
            fontStyle: 'bold'
          }
        },

        Description: {
          y: 150,
          w: 800,
          h: 400,
          text: {
            text: '',
            fontSize: 25,
            lineHeight: 40,
            wordWrap: true
          }
        },

        DirectedBy: {
          y: 450,
          text: {
            text: 'Directed by ',
            fontSize: 20
          }
        },

        WrittenBy: {
          y: 450,
          x: 350,
          text: {
            text: '',
            fontSize: 20,
            lineHeight: 40
          }
        },

        CastList: {
          y: 650,
          type: CastList,

          Title: {
            y: -80,
            text: {
              text: 'Cast',
              fontSize: 35,
              lineHeight: 40,
              fontStyle: 'bold'
            }
          }
        }
      }
    };
  }

  set tmdbData(data: Movie & Credits) {
    const background = this.tag('Background');
    const thumbnail = this.tag('Thumbnail');
    this.tag('CastList').castData = data.cast;

    background.on('txLoaded', () => {
      background.setSmooth('alpha', 0.6, { duration: 1 });
    });

    thumbnail.on('txLoaded', () => {
      thumbnail.setSmooth('alpha', 1, { duration: 1 });
    });

    background.patch({
      texture: Img(`https://image.tmdb.org/t/p/original${data.backdrop_path}`).contain(1920, 1080)
    });

    thumbnail.patch({
      texture: Img(`https://image.tmdb.org/t/p/original${data.poster_path}`).contain(450, 450)
    });

    const writers = data.crew.filter((person) => person.job.toLowerCase() === 'writer');
    const director = data.crew.find((person) => person.job.toLowerCase() === 'director');

    this.tag('Metadata').patch({
      Title: {
        text: { text: data.title }
      },
      YearGender: {
        text: {
          text: `${new Date(data.release_date).toLocaleDateString('en-US', DATE_FORMAT)} • ${data.genres
            .map((g) => g.name)
            .join(', ')}`
        }
      },
      Duration: {
        text: { text: formatDuration(data.runtime) }
      },
      Description: {
        text: { text: data.overview }
      },
      DirectedBy: {
        text: director ? `Directed by ${director.original_name}` : ''
      },
      WrittenBy: {
        text: {
          text:
            writers && writers.length > 0
              ? `Written by ${writers.map((writer) => writer.original_name).join(', ')}`
              : ''
        }
      }
    });
  }

  _active() {
    this.widgets.menu.visible = true;
  }

  _handleLeft() {
    Router.focusWidget('MenuWithBackButton');
  }

  _getFocused() {
    return this.tag('CastList');
  }
}
