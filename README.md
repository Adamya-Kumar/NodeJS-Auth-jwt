### NodeJS-Auth-JWT

## Description:

This project is build for learning nodejs Auth-jwt..
 Signup Page..
![Signuppage](https://github.com/Adamya-Kumar/NodeJS-Auth-jwt/assets/101924838/3295c12b-0350-42e8-820a-6280061ee964)
Login Page..
![loginpage](https://github.com/Adamya-Kumar/NodeJS-Auth-jwt/assets/101924838/e60df21a-645c-4c40-b6f3-8f4c5bc524c3)
Home Page..
![Homepage](https://github.com/Adamya-Kumar/NodeJS-Auth-jwt/assets/101924838/4c5a1dea-80de-49d0-b590-0aa3eaa61367)
Home after user successfully login..
![userpage](https://github.com/Adamya-Kumar/NodeJS-Auth-jwt/assets/101924838/255516df-57d8-4851-b83f-3dac5fa109ae)


## Used Dependencies:
 {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "ejs": "^3.1.3",
    "express": "^4.17.1",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.3.0",
    "mongoose": "^5.13.21",
    "nodemon": "^3.0.1",
    "validator": "^13.11.0"
  }

## Install dependencies:

# npm install

## Authentication:

This project uses JSON Web Tokens (JWT) for authentication. Here's a brief overview:

Signup: Users can create an account by providing a unique username and a secure password. The password is stored in the database in hashed form.

Login: Users can log in with their username and password. Upon successful authentication, a JWT is issued, which should be included in the headers of subsequent requests for authorized routes.

Token Expiry: The JWT has a specified expiration time to enhance security. Users need to refresh their tokens to stay authenticated.

#Endpoints:

POST /signup: Create a new user account.
POST /login: Authenticate and receive a JWT.

## Database:

The project uses a database to store user information. Make sure to configure your database connection in the config or .env file.

## Password Hashing:

User passwords are securely hashed before being stored in the database. The project uses a strong hashing algorithm (e.g., bcrypt) to protect user credentials.

## License:

This project is licensed under the MIT License.
