const connection = require('../database/connection');

module.exports = {

  async create(request, response){
    //verificar no login se a ong existe
    const {id} = request.body;

    const ong = await connection('ongs')
      .where('id', id)
      .select('nome')
      .first();

      if(!ong){
        return response.status(400).json({error: 'No ONG found with this ID'})
      }
      return response.json(ong);
    
  }
}