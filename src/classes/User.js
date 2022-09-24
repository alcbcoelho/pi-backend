class User {
  constructor(id, username, password, firstName, lastName, phone, email) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
  }
}

module.exports = { User };