import mongoose from 'mongoose'
import express from 'express'
import Pusher from 'pusher'
import cors from 'cors'
import dbSchema from './dbSchema.js'


//app config
const app = express()
const port = process.env.PORT || 8000
const pusher = new Pusher({
    appId: "1103071",
    key: "055f80773b8421ad23b2",
    secret: "e5104bd5f159bd9bac8b",
    cluster: "us2",
    useTLS: true
});


//middleware
app.use(cors())
app.use(express.json())


//db config
const connectionUrl = 'mongodb+srv://admin:fETbeeEr0iPS3Ykv@cluster0.dpakh.mongodb.net/slackdb?retryWrites=true&w=majority';

mongoose.connect(connectionUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log("DB connected")
    const changeStream = mongoose.connection.collection('conversations').watch();

    changeStream.on('change', (change) => {
            if(change.operationType === 'insert'){
                console.log("Pusher triggered")
                pusher.trigger('channels', 'newChannel', {
                    'change': change
                })
            }else if(change.operationType === 'update'){
                pusher.trigger('conversation', 'newMessage', {
                    'change': change
                })
            }else{
                console.log("Error triggering Pusher")
            }
    })
})

//api routers
app.get('/', (req, res) => res.status(200).send("Hello World"))

app.post('/new/channel', (req, res) => {
    const dbData = req.body
    dbSchema.create(dbData, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.post('/new/message', (req, res) => {
    const id = req.query.id;
    const newMsg = req.body

    dbSchema.update(
        {_id: id}, 
        {$push: {conversation: newMsg}},
        (err, data) => {
            if(err){
                res.status(500).send(err)
            }else{
                res.status(201).send(data)
            }
        }
    )
})

app.get('/get/channelList', (req, res) => {
    dbSchema.find((err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            let channels = []
            data.map((eachChannel) => {
                const channelInfo = {
                    id: eachChannel._id,
                    name: eachChannel.channelName
                }
                channels.push(channelInfo)
            })
            res.status(200).send(channels)
        }
    })
})

app.get('/get/conversation', (req, res) => {
    const id = req.query.id

    dbSchema.find({_id: id}, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})
//listen
app.listen(port, () => console.log(`Listening from localhost:${port}`))