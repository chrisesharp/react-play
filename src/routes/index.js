"user strict";

import Bundler from 'parcel-bundler';
import health from './health.js';

const bundlerOpts = {
    hmrPort: 8080,
};

const bundler = new Bundler('./src/frontend/index.html', bundlerOpts);


export function use(app){
    health(app);
    app.use(bundler.middleware());
};
