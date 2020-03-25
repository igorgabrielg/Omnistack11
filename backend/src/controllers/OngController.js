const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    // Index faz a listagem de todos elementos da tabela
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs)
    },

    async create(request, response) {
        const { nome, email, whatsapp, cidade, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX')

        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            cidade,
            uf
        })

        return response.json({ id })
    }
}