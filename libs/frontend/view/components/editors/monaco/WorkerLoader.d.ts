declare module 'worker-loader!monaco-editor/esm/vs/language/css/css.worker' {
  class GraphqlWorker extends Worker {
    constructor()
  }

  // Uncomment this if you set the `esModule` option to `false`
  // export = WebpackWorker;
  export default GraphqlWorker
}
declare module 'worker-loader!*' {
  // You need to change `Worker`, if you specified a different value for the `workerType` option
  class WebpackWorker extends Worker {
    constructor()
  }

  // Uncomment this if you set the `esModule` option to `false`
  // export = WebpackWorker;
  export default WebpackWorker
}
