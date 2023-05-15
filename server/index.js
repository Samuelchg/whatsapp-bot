const express = require("express");
const bodyParser = require('body-parser');
const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
const port = 3001;

app.listen(port, () => {
    console.log(`Server listening on the port:${port}`)
});

app.post("/sendMessage", (req, res) => {
    const reqBody = req.body;
    client.sendMessage(reqBody.id, reqBody.message).then(item => {
        console.log('Sent Message To ' + reqBody.id + '[' + item.id.id + ']')
        console.log('[' + item.id.id + '] body: ' + item.body);
        console.log('[' + item.id.id + '] timestamp: ' + item.timestamp)
        res.statusCode = 200
        res.send({ chat: item })
    }).catch(err => {
        res.statusCode = 400
        res.send({ result: 'sent failure' })
    })
})

app.get("/getChats", (req, res) => {
    client.getChats().then(chats => {
        res.statusCode = 200
        res.send({ chats: chats })
    })
})

const client = new Client({
    authStrategy: new LocalAuth({ 
        clientId: "client-one" 
    })
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    console.log('Received Message From ' + message.from + '[' + message.id.id + ']')
	console.log('[' + message.id.id + '] body: ' + message.body);
    console.log('[' + message.id.id + '] timestamp: ' + message.timestamp)
});

client.initialize();
