<div align="center">
<img src="https://media4.giphy.com/media/khVofmhxrgVz4RsWv5/giphy.gif?cid=790b7611e80fc692840444e963e13c27831ec227f6566f23&rid=giphy.gif&ct=g" width="300" height="300"/>

<h1> <b>The Nook</b> </h1>

<h2> By Antonia Vladut, Lauren Goldstein, Tina Decman, Veronica Baldin </h2>

   <a href="https://github.com/CodeOp-tech/FS22_Team1">**Explore the docs »**</a>
    <br />
    <br />
    <a href="https://github.com/antoniavladut/MVP-Skin-Saver">View Demo</a>
    ·
    <a href="https://github.com/CodeOp-tech/FS22_Team1/issues">Report Bug</a>
    ·
    <a href="https://github.com/CodeOp-tech/FS22_Team1/issues">Request Feature</a>
  </p>
</div>
<br>
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#introduction">Introduction</a>
    </li>
    <li>
      <a href="#motivation">Motivation</a>
    </li>
    <li>
      <a href="#features-and-views">Features & Views</a>
    </li>
    <li>
      <a href="#tools-used">Tools Used</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#database-schema">Database Schema</a></li>
    <li><a href="#api-routes">API Routes</a></li>
    <li><a href="#future-features">Future Features</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>
<br>

# 

## Introduction

For avid readers who want to connect with fellow bookworms, **The Nook** is a community hub that makes it easier to create, manage, and join a book club.

<br>
https://user-images.githubusercontent.com/113427751/204394477-eb817b0f-6112-4ece-b19b-577d740a6fe0.mp4

<br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#

## Motivation

Many of the current reading apps (such as [Goodreads](https://www.goodreads.com/)) are not focused on the intimate community experience that many readers are looking for. Although some apps do offer the possibility to create clubs and message users, most of them do not set a limit on the number of members, resulting in overcrowded groups, and little to no engagement between members.

**The Nook** provides a space for people who are passionate about reading and are either already part of an existing bookclub or want to find a group of like-minded individuals to share their interest both online and in-person.<br>
To achieve the former, our app enables book club administrators to create a page for their existing club where members can easily vote for the next book to read, access the information about past books read in the club, and see other members' opinion about books.
<br> The latter, on the other hand, can browse through the existing book clubs to join one, or start a new one if there is none of their interest.


<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Motivation and Description

## Features & Views

This app is made up of the following views: **Home - Clubs - Single Club - Club Admin - Books - Single Book - Profile - Edit Profile - Contact - Log In - Sign Up - Error Page**.

### **Home**

Consists of **The Nook**'s logo and mission statement, a carousel displaying of book clubs (with clickable links if the user is logged in), as well as the top 4 books based on users' ratings.

### **Clubs**

On the left side, you can browse through all existing clubs through the search function, filtering by club name, location or category, or create a new club using by filling in the form.
You can also enter the page of an existing club by clicking on the **More Info** button at the bottom of its correspondent card.

### **Single Club**
Shows a list of the club's members, relevant information about the next meeting (if one has been scheduled), a poll to vote on the next book to read (if applicable), and a bookshelf with all the books that have been previously discussed in that club.
<br>
*This view can only be accessed by logged-in users.*

### **Club Admin**

On the left side, the **Add Meeting** form will fetch a book from the *Google Books API* based on the book's title, and update the **Next Meeting** section in the single club view. 
The form on the right side will create a three-option poll for club members to vote the next book to read. The poll will be visible on the club page, and the percentages for each option will update after each vote.
<br>
*This view can only be accessed by club creators, and can be reached by clicking on the **Club Admin** button on the **Single Club** view.*

### **Books**
Provides a list of all books that have been entered in the database by users or clubs, and displays the clubs in which each book is being read. You can also search for a specific book based on its title or author.


### **Single Book**
When clicking on **More Info** underneath a book card in the **Books** view, you will be redirected to a more extensive description of that book, followed by the clubs that have discussed that book, and the ratings and reviews of all users that have read that book.
<br>
*This view can only be accessed by logged-in users.*

### **Profile**

It displays the user's username and password, a list of all clubs they are a member of, a shelf with the books they have marked as favorites as well as a shelf with all books they have read and given a rating to.
<br>
*This view can only be accessed by logged-in users, by clicking on the **Profile** button on the navbar.*

### **Edit Profile**

This page allowes users to search for a specific club or book to edit by using the respective search function.
<br>
Users can leave a club they are members of by clicking on the **Leave club** button on the club's card and confirming the message that will pop up on the screen.
<br>
 They can also **Add A New Book** by filling in the form, which will result in an API fetch based on the book's name.
 <br>
 Finally, they can edit their rating, date, favorite status, and review for each book in their bookshelf.
<br>
*This view can only be accessed by logged-in user, by clicking on the **Edit** button on top of the **Profile View**.*

### **Contact**

When clicking on the **Contact** button in the navbar, you will see **The Nook**'s contact information. You can contact **The Nook** by filling in the form on the right; upon clicking on **Send**, you will receive an email on the address that you provided confirming that the message has been received correctly, including a copy of your message.


### **Log In**

Users can log in by clicking on the **Log In / Register** button on the navbar, or through the **Join The Nook!** button on the top section of the **Home** page. Moreover, users will be redirected to this screen if they try to click on the **More Info** button when browsing through the **Clubs** page.

To log in, a user has to provide a correct username-password combination. Once the user is logged in, the navbar will show a button to access this user's profile and edit it, as well as a button to log out, thus terminating the session. 

### **Sign Up**

The **Sign Up** view can be from the **Log In** view. A new user can create an account by typing in a username, email, and password. Upon clicking on **Create Account**, the user will be automatically logged in and redirected to the **Home** page.

### **Error page**

The **Error** page will appear if the user types in an inexistent URL. It contains buttons that enable the user to navigate to the **Books** or **Clubs** views, or the **Home** page.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# 
## Tools Used

* VS Code
* Github
* Gitbash
* Postman
* MySQL
* HTML
* CSS
* JavaScript
* React.js
* Bootstrap
* Node.js
* Express
* Lodash
* JWT
* Bcrypt
* EmailJS
* Google Jamboard
* Trello
* Mural
* Luxon
* DrawSQL
* Google Books API
* React-Leaf-Polls
* React Stars
* Canva

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# 

## Getting Started
<br>

### Prerequisites
- npm
- node
- mySQL
- GoogleBooksAPI Key

<br>

### Installation

1. Create a .env file:

  ```
  DB_HOST = localhost
  DB_NAME = the_nook
  DB_USER = root
  DB_PASSWORD = root
  GOOGLE_BOOKS_API_KEY = (Enter your key once it's been created.)
  TZ = UTC
  ```

2. To run the database, type 'mysql' into the terminal and run the following command:
 ```sh
  CREATE DATABASE the_nook;
  ```

3. Install NPM packages on both the server and on the client.
```
npm install
```

4. Make sure to populate your database with the correct info by typing this on the server side:
```
npm run migrate
```

5. To run the backend, type in the server side:
```
npm start
```

6. In a second terminal window, type 'cd client' to get into the front-end folder, then type:
```
npm start
```

 Frontend runs on http://localhost:3000, and backend runs on http://localhost:5000.

 <p align="right">(<a href="#readme-top">back to top</a>)</p>

# 

## Database Schema

![DBSchema](https://user-images.githubusercontent.com/110904967/204106052-e2153a94-b5ed-475b-b837-7fe40c2c5544.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# 

## API Routes

A table explaining all API routes' design in detail can be accessed [here](https://docs.google.com/document/d/1qDGPEbRoCFpYr-UseVBFBn2ScdaWJBR-z2eMiCRtyRE/edit?usp=sharing).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#

## Future Features 
Some of the features that will be implemented in the future include: 
- A **chat** feature for each club's page;
- A **calendar** showing next and past meeting's of a club;
- A **map** to show the club's next meeting location;
- A **shop** for users' to buy the books for the next meeting;
- Possibility to choose a club's **maximum number of users** (now by default at 5 members for all clubs).

<br>

### Instructions to add features:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/MyFeature`)
3. Commit your Changes (`git commit -m 'Added MyFeature'`)
4. Push to the Branch (`git push origin feature/MyFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#

## Contact

Antonia Vladut - [LinkedIn](https://www.linkedin.com/in/antoniavladut/) 

Lauren Goldstein - [LinkedIn](https://www.linkedin.com/in/laurengolds/)

Tina Decman - [LinkedIn](https://www.linkedin.com/in/tinadecman/)

Veronica Baldin - [LinkedIn](https://www.linkedin.com/in/veronica-baldin/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#

## Acknowledgements

* Instructor [Jim Rudolf](https://github.com/jbrcodes)
* TA [Lucie Baborová](https://github.com/lucieBBR)
* TA [Maria Llaverias Pugliese](https://github.com/mariallaverias)
* TA [Pia Prozesky](https://github.com/piaprozesky)

<br>

### Thank you for all your help!<br>

*This is a student project that was created at [CodeOp](https://codeop.tech/), a full stack development bootcamp in Barcelona.*

<p align="right">(<a href="#readme-top">back to top</a>)</p>