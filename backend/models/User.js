module.exports = class User {
  userName;
  token;

  constructor(userName, token) {
    this.userName = userName;
    this.token = token;
  }
};
