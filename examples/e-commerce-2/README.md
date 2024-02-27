# e-commerce site

This is an attempt to replicate the mock e-commerce site from vercel: https://demo.vercel.store/search

## Features

- Fetch products from a server and render each products in a grid
- Searching, filtering, and sorting functionality
- Navigation to each product page when clicking a product card
- WIP: Add to cart functionality

## Local setup

You will need a running server that the app will call for the products.

There is a `server` folder in here that you can run locally via running `node server.js` in that directory.

The resource for this app will use the url `http://localhost:4567` for the API endpoints.
