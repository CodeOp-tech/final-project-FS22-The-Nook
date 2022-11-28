# The Nook

## By Antonia Vladut, Lauren Goldstein, Tina Decman, Veronica Baldin


============================================================
## Introduction

For avid readers who want to connect with fellow bookworms, The Nook is a community hub that makes it easier to create, manage, and join a book club.


https://user-images.githubusercontent.com/113427751/204394477-eb817b0f-6112-4ece-b19b-577d740a6fe0.mp4


============================================================
## Motivation and Description

Many of the current reading apps such as [Goodreads](https://www.goodreads.com/) are not focused on the intimate community experience that many readers are looking for. Although some apps do offer the possibility to create clubs and message users, most of them do not set a limit on the number of members, resulting in overcroded groups and little to no engagement between members.

With out app, we wanted to provide a space for people who are passionate about reading and are either already part of an existing bookclub or want to find a group of like-minded individuals to share their passion both online and in-person. For the former, our app enables book club administrators to create a page for their existing club where members can easily vote for the next book to read, access the information about past books read in the club, and see other members' opinion about books. The latter, on the other hand, can browse through the existing book clubs to join one, or start a new one if there is none of their interest.

============================================================
## Features and Views

This app is made up of the following views: **Home - Clubs - Single Club - Club Admin - Books - Single Book - Profile - Edit Profile - Contact - Log in - Sign up - Error page**.

### Home

The home view consists of a brief introduction about *The Nook*, a carousel displaying a selection of book clubs (with clickable links if the user is logged in), as well as the top 4 books based on users' ratings.

### Clubs
In this view you can browse through all existing clubs through the search function on the left side, filtering by club name, location or category. You can also enter the page of an individual club by clickin on the **More Info** button on the bottom of its card, or create a new club using by filling in the form on the left side.

### Single Club
Each existing club has its own page showing a list of its members, the relevant information of the next meeting (if one has been scheduled), a poll to vote for the next book to read (if applicable), and a bookshelf with all the books that have been previously discussed in that club.   
This view can only be accessed by logged-in users.

### Club Admin
The club admin view can be accessed only by users who have admin status for a club (i.e. who created the club) by clicking on the **Club Admin** button in the single club view.
It consists of two form: the form on the left side will fetch a book from the *Google Books API* based on the Book Title and update the **Next Meeting** section in the single club view. 
The form on the right will create a poll for club members to vote the next book to read. The poll will have three options that will show in the club view, and the percentages for each option will update after each vote.

### Books
The Books View provides a list of all books that have been entered in the database by users or clubs. You can search for a specific book based on title or author.


### Single Book
When clicking on **More Info** underneat a book card in the Books view, you will see a more extensive description of that book, followed by the clubs that have discussed that book, and the ratings and reviews of all users that have read that book.
This view can only be accessed by logged-in users.

### Profile
This view can only be accessed by logged-in users, by clicking on the **Profile** button on the navbar.
It displays the user's username and password, a list of all clubs they are members of, a shelf with the books they have marked as favorites and a shelf with all books they have read.

### Edit Profile
This view can only be accessed by logged-in user, by clicking on the **Edit** button on top of the **Profile View**.
Users can leave a club they are members of by clicking on the **Leave club** button on the club's card and confirming the message that will pop up on the screen. They can also **Add A New Book** by filling in the form with the information, which will result in an API fetch based on the book's name. Finally, they can edit their rating, date, favorite status, and review for each book in their bookshelf. If they want to, they can search for a specific club or book to edit by using the respective search function.

### Contact

When clicking on the **Contact** button on the navbar, you will see *The Nook*'s contact information. If you want to contact *The Nook*, you can fill in the form on the right side of this view. Upon clicking on **Send**, you will receive an email on the address that you provided confirming that the message has been received correctly.


### Log in

Users can log in by clicking on the **Log In / Register** button on the navbar, or through the **Join The Nook!** button on the top section of the Home page. Moreover, users will be redirected to this screen if they try to click on the **More Info** button when browing Clubs in the **Clubs** page.

To log in, a user has to provide a correct username-password combination. Once the user is logged in, the navbar will show a button to access this user's profile and edit it, as well as a button to log-out, thus terminating the session. 

### Sign up

The Sign up view can be accessed bu clicking on the **Sign Up** button on the bottom of the Login View. A new user can create an account by typing in a username, email, and password. Upon clickin on **Create Account**, the user will be automatically logged in.

### Error page

The error page will appear if the user types in an inexistent url. It enables the user to navigate to the Books view, the Clubs view, or the Home page, by clicking on the respective button.

============================================================
## Tools Used

VS Code, Github, Gitbash, Postman, MySQL, HTML, CSS, JavaScript, React, Bootstrap, Node.js, Express, Lodash, JWT, Bcrypt, Canva, EmailJS, Google Jamboard, Trello, Mural, Luxon, DrawSQL, Google Books API, React-Leaf-Polls, React Stars.

============================================================
## Prerequisites

- npm
- node
- mysql
- GoogleBooksAPI Key

============================================================
## Getting Started

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

============================================================
## Database Schema

![DBSchema](https://user-images.githubusercontent.com/110904967/204106052-e2153a94-b5ed-475b-b837-7fe40c2c5544.png)

============================================================
## API Routes

A table explaining all API routes' design in detail can be accessed [here](https://docs.google.com/document/d/1qDGPEbRoCFpYr-UseVBFBn2ScdaWJBR-z2eMiCRtyRE/edit?usp=sharing).

============================================================
## Future Features 
Some of the features that will be implemented in the future include: 
- A **chat** feature for each club's page;
- A **calendar** showing next and past meeting's of a club;
- A **map** to show the club's next meeting location;
- A **shop** for users' to buy the books for the next meeting;
- Possibility to choose a club's **maximum number of users** (now by default at 5 members for all clubs).

============================================================

## Acknowledgements

*This is a student project that was created at [CodeOp](https://codeop.tech/), a full stack development bootcamp in Barcelona.*
