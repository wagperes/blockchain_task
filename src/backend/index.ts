import api from './api/api';
import messageHandler from './utils/messageHandler';
import express from 'express';
const cors = require('cors');
const app = express();
const port = process.env.PORT || 9000;
const yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date);
const URL = 'blocks?format=json';
const ALT_URL = `blocks/${yesterday.getTime()}?format=json`;
const HASH_URL = '/rawblock';

app.listen(port, () => {
  console.log(`Starting server at  ${port}`);
});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.use(cors());
app.options('*', cors());

app.get('/blocks', async (request, response) => {
  try {
    const blocks_response = await api.get(URL);
    messageHandler(blocks_response);
    response.json(blocks_response.data);
  } catch (error) {
    messageHandler(error);
    console.log('Error to get the data from main url. Trying the alternative one...');
    try {
      const blocks_response = await api.get(ALT_URL);
      messageHandler(blocks_response);
      response.json(blocks_response.data);
    } catch (error) {
      messageHandler(error);
    }
  }
});

app.get('/blocks/:hash', async (request, response) => {
  try {
    console.log(`Hash parameter: ${JSON.stringify(request.params)}`);
    const blockDetailResponse = await api.get(`${HASH_URL}/${request.params.hash}`);
    messageHandler(blockDetailResponse);
    response.json(blockDetailResponse.data);
  } catch (error) {
    messageHandler(error);
  }
});