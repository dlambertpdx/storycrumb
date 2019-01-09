# StoryCrumb

[StoryCrumb](https://polar-inlet-60727.herokuapp.com/) is a responsive, full stack, and secure journal app for jotting down story ideas for your book or screenplay.

![alt text](img/story-crumb-main.PNG 'main screen') ![alt text](img/story-crumb-stories.PNG 'main screen')

## Live Demo

To use the demo, [log in](https://polar-inlet-60727.herokuapp.com/users/login) with the following credentials:

username: `demo@demo.com`
password: `demo1234`

![alt text](img/story-crumb-login.PNG 'log in screen')

## Technology Used

- JavaScript
- Bootstrap
- Node JS
- Passport
- JWT Webtoken
- Mongoose
- Heroku

## API

| Endpoint       | Method | Description                                |
| -------------- | :----: | ------------------------------------------ |
| users/register |  GET   | User Registration                          |
| users/register |  POST  | Submit Registration Form                   |
| users/login    |  GET   | User Login                                 |
| users/login    |  POST  | Submit Login Credentials                   |
| users/logout   |  GET   | User Logout                                |
| ideas/         |  GET   | Get all Ideas from logged in user          |
| ideas/add      |  GET   | New Idea form for logged in user           |
| ideas/add      |  POST  | Submit Idea for logged in user             |
| ideas/edit/:id |  GET   | Edit Idea form for logged in user          |
| ideas/:id      |  PUT   | Update single Idea form for logged in user |
| ideas/:id      | DELETE | Delete single Idea form for logged in user |
