import { Lightning, Router } from '@lightningjs/sdk';
import { isAxiosError } from 'axios';
import Logo from '../components/logo';

// Shown by the Router (route '!') when a route's `before` hook fails, e.g. a TMDB request is rejected
export default class ErrorPage extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      h: 1080,

      Logo: {
        type: Logo
      },

      Message: {
        x: 1920 / 2,
        y: 1080 / 2 + 200,
        w: 1200,
        mountX: 0.5,
        text: {
          text: 'Something went wrong',
          fontSize: 25,
          fontStyle: 'bold',
          textAlign: 'center',
          wordWrap: true,
          lineHeight: 40
        }
      },

      Hint: {
        x: 1920 / 2,
        y: 1080 / 2 + 300,
        mountX: 0.5,
        alpha: 0.6,
        text: { text: 'Press Enter to try again', fontSize: 20 }
      }
    };
  }

  _onUrlParams({ request }: { request?: { error?: unknown } }) {
    this.tag('Message').text.text = describeError(request?.error);
  }

  _handleEnter() {
    Router.navigate('home', false);
  }
}

const describeError = (error: unknown): string => {
  if (isAxiosError(error)) {
    if (error.response?.status === 401) {
      return 'TMDB rejected the request (401). Set a valid API_KEY in .env and restart the dev server.';
    }
    return `Couldn't reach TMDB: ${error.message}`;
  }
  return error instanceof Error ? error.message : 'Something went wrong';
};
