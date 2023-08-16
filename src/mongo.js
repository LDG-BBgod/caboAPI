const { MongoClient, ServerApiVersion } = require('mongodb')

const mongoURL = `mongodb+srv://padzz321:ldg8410229@cluster0.tib7owr.mongodb.net/`
const dbName = 'cabotDev'
const colName = 'users'

async function connectToMongoDB(callback) {

    const client = new MongoClient(mongoURL, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      })

    try{
        await client.connect()
        const collection = client.db(dbName).collection(colName)
        callback(null, collection)
    }
    catch (err) {
        callback(err)
    }

    // MongoClient.connect(mongoURL, (err, client) => {
    //     if (err){
    //         return callback(err)
    //     }

    //     const collection = client.db(dbName).collection(colName)

    //     callback(null, collection)
    // })
}

module.exports = { connectToMongoDB }