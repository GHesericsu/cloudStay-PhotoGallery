const newrelic = require('newrelic');
const express = require('express');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const {
  getPhotosSql, getPhotos, postSaveToList, updateSaveToList, deleteItem, postSaveSql, getSaveSql, updateSaveSql
} = require('./Controllers.js');

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker %d died with code/signal %s. Restarting worker...', worker.process.pid, signal || code);
    cluster.fork();
  });
} else {
  const app = express();

  const port = 3003;
  app.use(cors());
  app.use(express.json());
  app.use('/rooms/:roomId', express.static(path.join(__dirname, '../client/dist')));

  app.get('/api/rooms/:roomId/photos', getPhotosSql);

  app.get('/api/rooms/:roomId/save', getSaveSql);

  app.post('/api/rooms/:roomId/save', postSaveSql);

  app.put('/api/rooms/:roomId/save', updateSaveSql);

  app.route('/api/:roomId/photogallery')
    .get(getPhotos)
    .post(postSaveToList)
    .put(updateSaveToList)
    .delete(deleteItem);

  app.listen(port, () => console.log(`listening at http://localhost:${port}`));
}
