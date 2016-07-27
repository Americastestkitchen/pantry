import compression from 'compression';
import express from 'express';
import render from './render';

const app = express();

app.use(compression());

app.get('*', render);

app.on('mount', () => {
  console.log('App is available at %s', app.mountpath);
});

export default app;
