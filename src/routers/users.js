// @ts-check
/* eslint-disable no-console */
const express = require('express')
const { connectToMongoDB } = require('../mongo');

const router = express.Router()


router.post('/', async (req, res) => {
    const userData = req.body

    connectToMongoDB((err, collection) => {
        if (err) {
            res.status(500).send('Failed to connect to MongoDB')
            return
        }
        collection.insertOne({
            test: "test"
        })
        res.sendStatus(200)
    })
})


module.exports = router




