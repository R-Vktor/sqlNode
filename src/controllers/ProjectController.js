const knex = require('../database')


module.exports = {
    async index(req, res, next) {
        try {
            const { user_id, page = 1 } = req.query;

            const query = knex('projects')
            // as propriedades a baixo sao responsaveis por adicionar paginacao
            .limit(5)                 // esta define o limite de itens por pagina          
            .offset((page - 1) * 5)   // esta define a regra para apresentar sempre de 5 em 5 paginas sem repetir a ultima

            const countObj = knex('projects').count()

            if (user_id) {
                query
                .where({ user_id })
                .join('users', 'users.id', '=', 'projects.user_id')
                .select('projects.*', 'users.username')
                .where('users.deleted_at', null)

                countObj
                .where({ user_id })
            }

            const [count] = await countObj
            res.header('X-TOTAL-COUNT', count["count"] )

            const results = await query

            return res.json(results)
        } catch (error) {
            next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { title, user_id } = req.body //O corpo da requisicao será no formato Json pois foi configurado para ser assim no arquivo server.js
            
            await knex('projects').insert({
                title,
                user_id
            })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }

    }
}