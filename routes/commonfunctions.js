let booksSql = `SELECT users.*, users.id AS user_id, ub.rating, ub.date_read, ub.favorite, books.*
  FROM users
  LEFT JOIN users_books AS ub ON users.id = ub.user_id
  LEFT JOIN books ON ub.book_id = books.id`;

let clubsSql = `SELECT users.*, users.id AS user_id, clubs.*
  FROM users
  LEFT JOIN users_clubs AS uc ON users.id = uc.user_id
  LEFT JOIN clubs ON uc.club_id = clubs.id`;

function joinToJson(booksResult, clubsResult) {
  let row0 = booksResult.data[0];

  let books = [];
  books = booksResult.data.map((b) => ({
    title: b.title,
    author: b.author,
    rating: b.rating,
    date_read: b.date_read,
    favorite: b.favorite,
    image: b.image,
  }));

  console.log(clubsResult.data);
  let clubs = [];
  clubs = clubsResult.data.map((c) => ({
    name: c.name,
    category: c.category,
    // next_mtg_time: c.next_mtg_time,
    // next_mtg_location_name: c.next_mtg_location_name,
    // next_mtg_address: c.next_mtg_address,
    // next_mtg_city: c.next_mtg_city,
    // next_mtg_postal_code: c.next_mtg_postal_code,
    // next_mtg_country: next_mtg_country,
  }));

  let user = {
    id: row0.user_id,
    username: row0.username,
    email: row0.email,
    books,
    clubs,
  };

  return user;
}

module.exports = {
  joinToJson,
  clubsSql,
  booksSql,
};