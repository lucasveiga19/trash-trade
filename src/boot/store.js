// src/boot/store.js
import { boot } from 'quasar/wrappers';
import createStore from '../store';

export default boot(({ app }) => {
  const store = createStore();
  app.use(store);
});
