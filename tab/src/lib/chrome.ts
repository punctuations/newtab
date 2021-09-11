declare global {
  interface Window {
    chrome: {
      app: {
        [p: string]: () => {};
      };
      loadTimes: () => {};
      csi: () => {};
    } | null;
  }
}

window.chrome = window.chrome || null;

export default window;
