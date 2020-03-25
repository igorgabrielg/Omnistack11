const express = require('express')
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
routes.post('/users', (Request, Response) => {
    const body = Request.body;
    
    console.log(body)

    return Response.json(
    {
        evento: "Semana Omnistack 11",
        aluno: 'Igor Gabriel'
    })
})


// Busca uma informação
routes.get('/users', (Request, Response) => {
     return Response.json(
        {
            evento: "Semana Omnistack 11",
            aluno: 'Igor Gabriel'
        }
    )
 })

 // Exporta esse arquivo para ser usado em outros lugares
 module.exports = routes;