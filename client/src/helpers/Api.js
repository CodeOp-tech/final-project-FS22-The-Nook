import Local from "./Local";

class Api {
  /**
   * Log in a user
   **/

  static async loginUser(username, password) {
    let body = { username, password };

    return await this._doFetch("/login", "POST", body);
  }

  /**
   * Get all users
   **/

  static async getUsers() {
    return await this._doFetch("/users");
  }

  /**
   * Get data for user with ID 'userId'
   **/

  static async getUser(userId) {
    return await this._doFetch(`/users/${userId}`);
  }


  /**
   * Delete a user from a club'
   **/

   static async leaveClub(userId, clubId) {
    return await this._doFetch(`/leaveclub/${userId}`, "PUT", {club_id: +clubId});
  }

  /**
   * Get all books from books table associated with club with ID 'club_id'
   **/

  static async getClubBooks(club_id) {
    return await this._doFetch(`/books/?club_id=${club_id}`);
  }

  /**
   * Get club with ID 'id'
   **/

  static async getClub(id) {
    return await this._doFetch(`/clubs/${id}`);
  }

  /**
   * General purpose GET (for URLs like /members-only)
   **/

  static async getContent(url) {
    return await this._doFetch(url);
  }


  /**
   * Private method for internal use only
   **/

  static async _doFetch(url, method = "GET", body = null) {
    // Prepare fetch() options
    let options = {
      method,
      headers: {},
    };

    // Add token to headers if it exists in localStorage
    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }

    // Add the body if one is supplied
    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    // Do the fetch() and store the results in a "unified" myresponse obj
    let myresponse = { ok: false, data: null, status: 0, error: "" };
    try {
      let response = await fetch(url, options);
      if (response.ok) {
        myresponse.ok = true;
        myresponse.data = await response.json();
        myresponse.status = response.status;
      } else {
        myresponse.status = response.status;
        myresponse.error = response.statusText;
      }
    } catch (err) {
      myresponse.error = err.message;
    }

    return myresponse;
  }
}

export default Api;
