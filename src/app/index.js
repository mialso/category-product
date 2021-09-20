window.onload = () => {
    const uiChunk = import('../render/react');
    const storeChunk = import('../store/index.dev');

    // TODO: try fetch initial data as well

    Promise.all([ uiChunk, storeChunk ])
        .then(([ ui, store ]) => {
            const appStore = store.configureStore({});
            ui.render(appStore);
        });
};
