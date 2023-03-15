const express = require('express');
const { isAuthenticated } = require('../middleware/isAuthenticated')
const { redisClient } = require('../services/RedisStoreSession');

const router = express.Router();
const ProductItems = [
    {
        id: 1, name: 'Mouse', price: 199
    },
    {
        id: 2, name: 'Keyboard', price: 2000
    },
    {
        id: 3, name: 'Iphone', price: 2999
    },
    {
        id: 4, name: 'Macbook', price: 3899
    }
]

router.get('/shopping', isAuthenticated, (req, res) => {

    if (ProductItems.length > 0) {
        return res.json(ProductItems).status(200)
    }

    return res.statusCode(400)
})

router.post('/addToMyCart', isAuthenticated, async (req, res) => {
    const body = req.body;

    if (body.length > 0) {

        const items = []

        for (let x = 0; x < body.length; x++) {
            const product = ProductItems.find(item => item.id === body[x].id)
            if (product) items.push(fromProducts);
        }

        const keyUserCart = req.user.email + '.cart';

        const userCart = await redisClient.get(keyUserCart);

        if (userCart) {
            const itemsCart = JSON.parse(userCart);
            itemsCart.push(...items);
            await redisClient.set(keyUserCart, JSON.stringify(itemsCart));
        } else {
            await redisClient.set(keyUserCart, JSON.stringify(items))
        }
        return res.redirect('/checkMyCart')
        return res.json({ message: 'items added to your cart...' })
    }

    return res.json({ message: 'did not send me anything...' })
})


router.get('/checkMyCart', isAuthenticated, async (req, res) => {
    const userKeyCart = req.user.email + '.cart';
    const cart = JSON.parse(await redisClient.get(userKeyCart));

    if (cart && cart.length > 0) {
        return res.json({
            message: `Hello, ${req.user.name}`,
            cart
        })
    }

    return res.json({ message: 'your cart is empty' })
})


module.exports = {
    ShooppingRoutes: router
}