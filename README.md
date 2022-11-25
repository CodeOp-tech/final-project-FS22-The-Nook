# BookClub

## By Antonia, Lauren, Tina, Veronica

## Initial README file

## Prerequisites:

- npm
- node
- mysql
- GoogleBooksAPI Key

## Getting Started:

- Create a .env file:

  ```
  DB_HOST = localhost
  DB_NAME = the_nook
  DB_USER = root
  DB_PASSWORD = root
  GOOGLE_BOOKS_API_KEY = (Enter your key once it's been created.)
  TZ = UTC
  ```

- To run the database: Type mysql into the terminal and run the following command:
  CREATE DATABASE the_nook;

- Run npm install on the server and on the client.

- Run npm run migrate.

- To run the backend: Run npm start.

- To run the frontend: cd into client and run npm start.

- Frontend runs on http://localhost:3000 and backend runs on http://localhost:5000

## Database Schema:

![](DBSchema.png)

## API Routes:

### GET /users

Gets all users
Response body:

```
[
    {
        id: integer,
        username: string,
        email: string
    },
    ...
]
```

### GET /users/:userId

Gets info for one user
Response body:

```
[
    {
        id: integer,
        username: string,
        email: string,
        books: [
            {
                book_id: integer,
                title: string,
                author: string,
                rating: integer,
                date_read: date,
                favorite: integer,
                comment: string,
                image: string
            }
        ],
        clubs: [
            {
                name: string,
                category: string,
                id: integer,
                image: string,
                next_mtg_city: string
            }
        ]
    },
    ...
]
```

### POST /register

Adds a new user

Request body:

```
{
    username: string,
    password: string,
    email: string,
}
```

Response body:

```
{
    message: "Registration succeeded"
}
```

### POST /login

Log in a user, create JWT token

Request body:

```
{
    username: string,
    password: string,
}
```

Response body:

```
{
    message: "Login succeeded",
    user: {
        id: integer,
        username: string,
        email: string,
        books: [
            {
                book_id: integer,
                title: string,
                author: string,
                rating: integer,
                date_read: date,
                favorite: integer,
                comment: string,
                image: string
            }
        ],
        clubs: [
            {
                name: string,
                category: string,
                id: integer,
                image: string,
                next_mtg_city: string
            }

        ]
    },
    token: string
}
```

### POST /joinclub/:id

Adds a user to a club

Request body:

```
{
    club_id: integer
}
```

Response body:

```
{
    "id: 1,
    "username": string,
    "email": string
}
```

### POST /addClubAdmin/:id

Adds a user as an admin to a club

Request body:

```
{
    id: integer
}
```

Response body:

```
{
    "id: 1,
    "username": string,
    "email": string
}
```
