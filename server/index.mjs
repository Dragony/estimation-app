import express from 'express';
import bodyParser from 'body-parser'
import uuid from 'uuid/v4';
import { handleGetRequest, handlePostRequest, handleEstimationDeleteRequest } from './Page/EstimationPage.mjs';

const app = express();

app.use(bodyParser.json());

app.get('/api/new', (req, res) => res.redirect(302, '/api/' + uuid()));
app.get('/favicon.ico', (req, res) => res.send('Nothing here'));
app.post('/api/delete-estimation', handleEstimationDeleteRequest);
app.get('/api/:uuid', handleGetRequest);
app.post('/api/:uuid', handlePostRequest);

app.listen(3001, () => console.log('running!'));