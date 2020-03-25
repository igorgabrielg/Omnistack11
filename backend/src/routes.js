const express = require('express')

const OngController = require('./controllers/OngController')
const CasosController = require('./controllers/CasosController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create)

routes.get('/profile', ProfileController.index)

routes.get('/casos', CasosController.index)
routes.post('/casos', CasosController.create)
routes.delete('/casos/:id', CasosController.delete)

 // Exporta esse arquivo para ser usado em outros lugares
 module.exports = routes;