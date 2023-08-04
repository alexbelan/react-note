const staticCasheName = 'static-site'

// const ASSETS = [
//     '',
//     '/@vite/client',
//     '/src/main.jsx',
//     '/src/index.css',
//     '/src/App.jsx',
//     '/@react-refresh',
//     '/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c2e2c9a7',
//     '/node_modules/.vite/deps/react.js?v=c2e2c9a7',
//     '/node_modules/.vite/deps/react-dom_client.js?v=c2e2c9a7',
//     '/node_modules/vite/dist/client/env.mjs',
//     '/src/App.css',
//     '/src/ErrorBoundary.jsx',
//     '/node_modules/.vite/deps/react-router-dom.js?v=c2e2c9a7',
//     '/src/pages/Main.jsx',
//     '/src/pages/MainLayout.jsx',
//     '/src/pages/PrivateRoute.jsx',
//     '/src/pages/MainPage.jsx',
// ]

self.addEventListener('install', (event) => {
    console.log('Install server worker')
    // caches.open(staticCasheName).then(cache => {
    //     cache.addAll(ASSETS)
    // })
})

self.addEventListener('activate', (event) => {
    console.log('Activate server worker')
})

self.addEventListener('fetch', (event) => {
    console.log('fetch', event.request.body)
})