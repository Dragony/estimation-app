import express from 'express';
import bodyParser from 'body-parser'
import uuid from 'uuid/v4';
import { handleGetRequest, handlePostRequest } from './Page/EstimationPage.mjs';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => res.redirect(302, uuid()));
app.get('/favicon.ico', (req, res) => res.send('Nothing here'));
app.get('/:uuid', handleGetRequest);
app.post('/:uuid', handlePostRequest);

app.listen(3000, () => console.log('running!'));