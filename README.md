# whatsapp-bot
# whatsapp-web.js
A WhatsApp API client that connects through the WhatsApp Web browser app

It uses Puppeteer to run a real instance of Whatsapp Web to avoid getting blocked.

**NOTE:** Can't guarantee you will not be blocked by using this method, although it has worked for me. WhatsApp does not allow bots or unofficial clients on their platform, so this shouldn't be considered totally safe.

## Quick Links

* [Guide / Getting Started](https://wwebjs.dev/guide) _(work in progress)_
* [Reference documentation](https://docs.wwebjs.dev/)
* [GitHub](https://github.com/pedroslopez/whatsapp-web.js)
* [npm](https://npmjs.org/package/whatsapp-web.js)

## Installation

Type the following command :

`npm i express`

`npm i whatsapp-web.js`

`npm i qrcode-terminal`

`npm i body-parser`

Please note that Node v12+ is required.

## Example usage

```js
const { Client } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();
```

Take a look at [example.js](https://github.com/pedroslopez/whatsapp-web.js/blob/master/example.js) for another example with more use cases.

For more information on saving and restoring sessions, check out the available [Authentication Strategies](https://wwebjs.dev/guide/authentication.html).
