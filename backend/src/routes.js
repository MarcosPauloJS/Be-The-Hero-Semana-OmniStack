const express = require('express');

const routes = express.Router();

const orgController = require('./controllers/orgController');
const incidentController = require('./controllers/incidentControler');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController')

routes.post('/sessions', sessionController.create)

routes.get('/ongs', orgController.index );
routes.post('/ongs', orgController.create );

routes.get('/profile', profileController.index)

routes.get('/incidents', incidentController.index );
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);


module.exports = routes;