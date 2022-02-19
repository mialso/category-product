const arrayToArgs = (func) => (argsArr) => func(...argsArr);

function runApp(ui, store) {
    const appStore = store.configureStore({});
    ui.render(appStore);
}

function loadApp() {
    const uiChunk = import('../render/react');
    const storeChunk = import('../store/index.dev');

    // TODO: try fetch initial data as well

    Promise.all([ uiChunk, storeChunk ])
        .then(arrayToArgs(runApp));
}

window.onload = loadApp;
