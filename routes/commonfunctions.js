let booksSql = `SELECT users.*, users.id AS user_id, ub.rating, ub.date_read, ub.favorite, ub.comment, books.*, books.id AS book_id
  FROM users
  LEFT JOIN users_books AS ub ON users.id = ub.user_id
  LEFT JOIN books ON ub.book_id = books.id`;

let clubsSql = `SELECT users.*, users.id AS user_id, clubs.*
  FROM users
  LEFT JOIN users_clubs AS uc ON users.id = uc.user_id
  LEFT JOIN clubs ON uc.club_id = clubs.id`;

let clubMembersListSql = `
        SELECT clubs.id AS club_id, users.username, users.id, users_clubs.admin
        FROM clubs
        INNER JOIN users_clubs on clubs.id = users_clubs.club_id
        INNER JOIN users ON users_clubs.user_id = users.id
        `;

function joinToJson(booksResult, clubsResult) {
  let row0 = booksResult.data[0];

  let books = [];
  books = booksResult.data.map((b) => ({
    book_id: b.book_id,
    title: b.title,
    author: b.author,
    rating: b.rating,
    date_read: b.date_read,
    favorite: b.favorite,
    comment: b.comment,
    image: b.image,
  }));

  let clubs = [];
  clubs = clubsResult.data.map((c) => ({
    name: c.name,
    category: c.category,
    // next_mtg_time: c.next_mtg_time,
    // next_mtg_location_name: c.next_mtg_location_name,
    // next_mtg_address: c.next_mtg_address,
    next_mtg_city: c.next_mtg_city,
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
  clubMembersListSql,
};
