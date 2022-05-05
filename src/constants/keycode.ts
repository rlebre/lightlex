export const enum KeyCode {
  KEY_SELECT = 'Select',
  KEY_BACK = 'Back',
  KEY_LEFT = 'Left',
  KEY_RIGHT = 'Right',
  KEY_UP = 'UP',
  KEY_DOWN = 'DOWN',
  KEY_RED = 'RED',
  KEY_GREEN = 'GREEN',
  KEY_YELLOW = 'YELLOW',
  KEY_F1 = 'F1',
  KEY_PLUS_BUTTON = 'Equal', // + button on Comcast remote, need to check equivalent code for samsung and update or customize per platform
  KEY_UNKNOWN = 0
}

const keymap: Record<string, KeyCode> = {
  Enter: KeyCode.KEY_SELECT,
  Space: KeyCode.KEY_SELECT,
  Backspace: KeyCode.KEY_BACK,
  Escape: KeyCode.KEY_BACK,
  XF86Back: KeyCode.KEY_BACK,
  ArrowLeft: KeyCode.KEY_LEFT,
  ArrowUp: KeyCode.KEY_UP,
  ArrowRight: KeyCode.KEY_RIGHT,
  ArrowDown: KeyCode.KEY_DOWN,
  '=': KeyCode.KEY_PLUS_BUTTON,
  F1: KeyCode.KEY_F1
};

export const getKey = (event: KeyboardEvent): KeyCode => {
  let key = keymap[event.key];
  if (!key) {
    key = keymap[event.keyCode.toString()];
  }
  return key || KeyCode.KEY_UNKNOWN;
};
