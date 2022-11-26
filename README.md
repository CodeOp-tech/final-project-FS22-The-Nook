# BookClub

## By Antonia, Lauren, Tina, Veronica

## Introduction

For avid readers who want to connect with fellow bookworms, The Nook is a community hub that makes it easier to create, manage, and join a book club.

## Tools Used:

VS Code, Github, Gitbash, Postman, MySQL, HTML, CSS, JavaScript, React, Bootstrap, Node.js,Express, Lodash, JWT, Bcrypt, Canva, EmailJS, Google Jamboard, Trello, Mural, Luxon, DrawSQL, Google Books API,
React-Leaf-Polls, React Stars

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

### PUT /leaveclub/:id

Remove a user from a club

Request body:

```
{
    club_id: integer
}
```

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
            },
            ...
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

### GET /books

Gets all books for a particular club

Response body:

```
[
    {
        id: integer,
        title: string,
        author: string,
        image: string
    },
    ...
]
```

### GET books/topbooks

Gets the 4 highest rated books
Response body:

```
[
    {
        book_id: integer,
        id: integer,
        title: string,
        author: string,
        image: string,
        avg_rating: integer
    },
    ...
]
```

### GET books/all

Gets all books

Response body:

```
[
    {
        book_id: integer,
        book_title: string,
        book_author: string,
        book_img: string,
        clubsThatRead: [
            {
                book_id: integer,
                club_id: integer,
                date: date,
                name: string,
                image: string
            },
            ...
        ],
        usersThatRead: [
            {
                id: 1,
                username: string,
                book_id: integer,
                rating: integer,
                comment: string,
                date_read: date,
                favorite: integer
            },
            ...
        ]
    },
    ...
]
```

### POST /books

Adds a book to a club's list

Request body:

```
{
    title: string
}
```

Response body:

```
{
    author: string,
    title: string,
    image: string,
    date: date,
    club_id: integer
}
```

### POST /books/:user_id

Adds a book to a club's list

Request body:

```
{
    title: string,
    rating: integer,
    comment: string,
    date_read: date,
    favorite: integer
}
```

Response body:

```
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
        },
        ...
    ]
    clubs: [
        {
            name: string,
            category: string,
            id: integer,
            image: string,
            next_mtg_city: string
        },
        ...
    ]
}
```

### PATCH /books/:id

Adds a book to a club's list

Request body:

```
{
    user_id: integer,
    rating: integer,
    comment: string,
    date_read: date,
    favorite: integer
}
```

Response body:

```
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
        },
        ...
    ]
    clubs: [
        {
            name: string,
            category: string,
            id: integer,
            image: string,
            next_mtg_city: string
        },
        ...
    ]
}
```

### GET clubs/

Gets all clubs

Response body:

```
[
    {
        id: integer,
        name: string,
        category: string,
        next_mtg_time: time,
        next_mtg_location_name: string,
        next_mtg_address: string,
        next_mtg_city: string,
        next_mtg_postal_code: string,
        next_mtg_country: string,
        image: string,
        book_poll_info: JSON,
        membersCount: integer,
        membersList: [
            {
                club_id: integer,
                username: string,
                id: integer,
                admin: integer
            }
        ]
    },
    ...
]
```

### GET clubs/:id

Gets info for a specific club
Response body:

```
[
    {
        id: integer,
        name: string,
        category: string,
        next_mtg_time: time,
        next_mtg_location_name: string,
        next_mtg_address: string,
        next_mtg_city: string,
        next_mtg_postal_code: string,
        next_mtg_country: string,
        image: string,
        book_poll_info: JSON,
        membersList: [
            {
                username: string,
                id: integer
            }
        ]
    }
]
```

### POST /clubs

Adds a new club

Request body:

```
{
    name: string,
    category: string,
    city: string,
    country: string,
    image: string
}
```

Response body:

```
{
    club_id: integer
}
```

### POST /clubs/:id

Adds a new user to a club

Request body:

```
{
    id: integer,
    name: string,
    category: string,
    next_mtg_time: time,
    next_mtg_location_name: string,
    next_mtg_address: string,
    next_mtg_city: string,
    next_mtg_postal_code: string,
    next_mtg_country: string,
    image: string,
    book_poll_info: JSON,
    membersCount: integer,
    membersList: [
        {
            club_id: integer,
            username: string,
            id: integer,
            admin: integer
        }
    ]
}
```

Response body:

```
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
        },
        ...
    ]
    clubs: [
        {
            name: string,
            category: string,
            id: integer,
            image: string,
            next_mtg_city: string
        },
        ...
    ]
}
```

### PATCH /clubs/:id

Updates the next meeting time, date and location OR the book poll options

Request body:

```
{
    next_mtg_time: time,
    next_mtg_location_name: string,
    next_mtg_address: string,
    next_mtg_city: string,
    next_mtg_postal_code: string,
    next_mtg_country: string,
    image: string,
    book_poll_info: JSON,
}
```

Response body:

```
[
    {
        id: integer,
        name: string,
        category: string,
        next_mtg_time: time,
        next_mtg_location_name: string,
        next_mtg_address: string,
        next_mtg_city: string,
        next_mtg_postal_code: string,
        next_mtg_country: string,
        image: string,
        book_poll_info: JSON,
        membersCount: integer,
        membersList: [
            {
                club_id: integer,
                username: string,
                id: integer,
                admin: integer
            },
            ...
        ]
    },
    ...
]
```
