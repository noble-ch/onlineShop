const Chapa = require('./lib/chapa')

let myChapa = new Chapa('secret-key')

const customerInfo =  {
    amount: '100',
    currency: 'ETB',
    email: 'abebe@bikila.com',
    first_name: 'Abebe',
    last_name: 'Bikila',
    // tx_ref: 'tx-x12345',
    callback_url: 'https://chapa.co', // your callback URL
    customization: {
        title: 'I love e-commerce',
        description: 'It is time to pay'
    }
}

myChapa.initialize(customerInfo, { autoRef: true }).then(response => {
    /*
    response:
        {
        message: 'Hosted Link',
        status: 'success' || 'failed',
        data: {
            checkout_url: 'https://checkout.chapa.co/checkout/payment/:token'
        },
        tx_ref: 'generated-token' // this will be the auto generated reference
        }
    */
    console.log(response)
    // saveReference(response.tx_ref)
}).catch(e => console.log(e)) // catch errors

// myChapa.verify('5b1472b1-4b28-475c-8fa9-8bf2242fea9f').then(d => console.log(d)).catch(e => console.log(e))