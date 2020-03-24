import express from 'express';
import bodyParser from 'body-parser'
import uuidPackage from 'uuid';
const { v4 } = uuidPackage;
import ejs from 'ejs';
import { handleGetRequest, handlePostRequest, handleEstimationDeleteRequest } from './Page/EstimationPage.mjs';

const app = express();

app.use(bodyParser.json());
app.use(express.static('client/build'));
app.set('views', 'client/build');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

console.log(process.argv[1] + '/client/build/index.html');

app.get('/', (req, res) => res.redirect(302, '/' + v4()));
app.get('/api/new', (req, res) => res.redirect(302, '/api/' + v4()));
app.get('/favicon.ico', (req, res) => res.send('Nothing here'));
app.post('/api/delete-estimation', handleEstimationDeleteRequest);
app.get('/api/:uuid', handleGetRequest);
app.post('/api/:uuid', handlePostRequest);
app.get('/:uuid', (req, res) => res.render('index'));

app.listen(process.env.PORT || 3001, () => console.log('running!'));