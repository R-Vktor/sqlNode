const knex = require('../database')


module.exports = {
    async index(req, res) {
        const results = await knex('users')
        return res.json(results)
    },
    async create(req, res, next) {
        try {
            const { username } = req.body //O corpo da requisicao será no formato Json pois foi configurado para ser assim no arquivo server.js
            await knex('users').insert({
            username
        })
            return res.status(201).send()
        } catch (error) {
            next(error)
        }

    },
    async update(req, res, next) {
        try {
            const { username } = req.body
            const { id } = req.params

            await knex('users')
            .update({ username })
            .where({ id })

            return res.send()

        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { id } = req.params

            await knex('users')
            .where({ id })
            .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    }

}