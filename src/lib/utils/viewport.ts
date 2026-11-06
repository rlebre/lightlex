// The Lightning stage is always 1920x1080 (precision 1). Lightning 2 can't resize the stage after launch,
// so the canvas element is scaled with CSS instead: fitted inside the window at 16:9 and centred (letterboxed).
const STAGE_WIDTH = 1920;
const STAGE_HEIGHT = 1080;

export interface ViewportRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** Largest 16:9 rect that fits inside the given area, centred. */
export const getViewportRect = (outerWidth: number, outerHeight: number): ViewportRect => {
  const stageRatio = STAGE_WIDTH / STAGE_HEIGHT;
  const width = outerWidth / outerHeight > stageRatio ? outerHeight * stageRatio : outerWidth;
  const height = width / stageRatio;

  return {
    left: Math.round((outerWidth - width) / 2),
    top: Math.round((outerHeight - height) / 2),
    width: Math.round(width),
    height: Math.round(height)
  };
};

/** Keeps the canvas fitted to the window. Returns a function that stops listening for resizes. */
export const fitCanvasToWindow = (canvas: HTMLCanvasElement): (() => void) => {
  let frame = 0;

  const apply = () => {
    frame = 0;
    const { left, top, width, height } = getViewportRect(window.innerWidth, window.innerHeight);
    Object.assign(canvas.style, {
      position: 'fixed',
      display: 'block',
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`
    });
  };

  // Restyling the canvas is cheap, so coalesce resize events per frame instead of debouncing
  const onResize = () => {
    if (!frame) frame = requestAnimationFrame(apply);
  };

  apply();
  window.addEventListener('resize', onResize);

  return () => {
    window.removeEventListener('resize', onResize);
    cancelAnimationFrame(frame);
  };
};
