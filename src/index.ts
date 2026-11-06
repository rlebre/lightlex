import { Launch } from '@lightningjs/sdk';
import App from './App';
import { fitCanvasToWindow } from './lib/utils/viewport';
import { appData, appSettings, platformSettings } from './settings';

// launch the application with custom settings
const app = Launch(App, appSettings, platformSettings, appData);

// append the canvas to the dom, scaled to fit the window
const canvas = app.stage.getCanvas();
document.body.appendChild(canvas);
fitCanvasToWindow(canvas);
