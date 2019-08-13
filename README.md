# sms-management

Manage contacts and their messages

The link to the API deployed to heroku: https://in-sms-management.herokuapp.com/

## Technologies

The application uses `Nodejs` and `Express` frameworks on the server and `PostgreSQL` with `Sequelize` as `ORM` for persisting data.

## Installation

Follow the steps below to setup a local development environment, make sure to have `Nodejs` and `PostgreSQL` installed.

1.  Clone the repository from a terminal `git clone https://github.com/megame24/sms-management.git`.
2.  Navigate to the project directory `cd sms-management`
3.  Run `npm install` on the terminal to install dependencies.
4.  Change `.env-sample` to `.env` and provide the necessary credentials
5.  Run `npm start` to start the application.

## Documentation

Swagger documentation link: https://in-sms-management.herokuapp.com/doc

  
## Api EndPoints

EndPoint                      |   Functionality
------------------------------|------------------------
POST /auth/register        |   User sign up(requires: name, phoneNumber, email, password)
POST /auth/login            |   User login(requires: email, password)
POST /sms        |   Send sms(requires: message, recipientNumber)
GET /sms          |   Get messages of a logged in user
DELETE /contact       |   Delete contact
PUT /contact         |   Update contact


## Licence

MIT