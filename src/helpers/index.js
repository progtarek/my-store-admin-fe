const persistUserData = ({ token, email, lastName, firstName, username }) => {
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('email', email);
  window.localStorage.setItem('lastName', lastName);
  window.localStorage.setItem('username', username);
  window.localStorage.setItem('firstName', firstName);
};

export { persistUserData };
