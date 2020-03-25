const express = require('express')
const crypto = require('crypto')

const connection = require('./database/connection')

const routes = express.Router()

/**
 * Métodos
 * 
 * Get: Buscar/Listar informações, Utilizado sempre que o Back-End for retornar alguma coisa
 * Post: Cria uma informação no Back-End
 * put: Alterar uma informação no Back-End
 * Delete: Deletar as informações do Back-End
 * 
 */

 /**
  * Tipos de parâmetros:
  * 
  * Query Params: Parâmetros chaveados, utilizado para Filtros(?nome=Igor&idade=22) paginação(?page=2)
  * Route Params: Parâmetros para identificar um unico recurso(users/:id = users/1)
  * Request Body: Corpo da Requisição, utilizado para criar ou alterar recursos
  */

/**
  * Retorna o valor do parametro
  * Exemplo: http://localhost:3333/users?name=bisnaga&idade=22
  * {"name":"bisnaga","idade":"25"}
  *  
  * app.get('/users', (Request, Response) => {
  *  const params = Request.query;
  * 
  * console.log(params)
  * 
  * return Response.json(
  *    params
  * )
  * })
  */


 /**
  * 
  * app.get('/users/:id', (Request, Response) => {
  * const params = Request.params;
  * 
  * console.log(params)
  * 
  * return Response.json(
  *     {
  *         evento: "Semana Omnistack 11",
  *         aluno: 'Igor Gabriel'
  *     })
  * })
 */

 
// Cria um novo usuario atraves do post
routes.post('/ongs', async (Request, Response) => {
    const { nome, email, whatsapp, cidade, uf} = Request.body;

    const id = crypto.randomBytes(4).toString('HEX')

    await connection('ongs').insert({
        id,
        nome,
        email,
        whatsapp,
        cidade,
        uf
    })

    return Response.json()
})

 // Exporta esse arquivo para ser usado em outros lugares
 module.exports = routes;