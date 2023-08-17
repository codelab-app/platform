const express = require('express')
const _ = require('lodash')
const products = require('./sample-products')
const app = express()
app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

let cart = []

app.get('/cart/cartId', (req, res) => {
  res.json(cart)
})

app.post('/cart/cartId/products', (req, res) => {
  console.log('req.body', req.body)
  const { id, quantity } = req.body

  if (quantity <= 0 && cart.some((c) => c.id === id)) {
    cart = cart.filter((c) => c.id !== id)
    return res.json(cart)
  }

  const cartProduct = cart.find((c) => c.id === id)

  if (cartProduct) {
    cartProduct.quantity = quantity

    return res.json(cart)
  }

  const product = products.find((p) => p.id === id)

  if (!product) {
    return res.status(404).send(`Product with id "${id}" is not found`)
  }
  cart.push({
    ..._.pick(product, ['id', 'imageUrl', 'name', 'price']),
    quantity,
  })

  res.json(cart)
})

app.get('/products', (req, res) => {
  const { name, sortBy } = req.query

  let filteredProducts = products
  if (name) {
    filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase()),
    )
  }

  switch (sortBy) {
    case 'price-low-to-high':
      filteredProducts = _.sortBy(filteredProducts, 'price')
      break
    case 'price-high-to-low':
      filteredProducts = _.sortBy(filteredProducts, 'price').reverse()
      break
    default:
      break
  }
  res.json(filteredProducts)
})

app.get('/products/:tag', (req, res) => {
  const { name, sortBy } = req.query
  const { tag } = req.params

  let filteredProducts = products.filter((product) => {
    return product.tags.includes(tag.toLowerCase())
  })

  if (name) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase()),
    )
  }

  switch (sortBy) {
    case 'price-low-to-high':
      filteredProducts = _.sortBy(filteredProducts, 'price')
      break
    case 'price-high-to-low':
      filteredProducts = _.sortBy(filteredProducts, 'price').reverse()
      break
    default:
      break
  }
  res.json(filteredProducts)
})

app.get('/product/:id', (req, res) => {
  const { id } = req.params

  const product = products.find((product) => {
    return product.id === id
  })

  if (!product) {
    return res.status(404).send()
  }

  res.json(product)
})

// Start the server
const port = 4567 // You can change this to any port you prefer
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
