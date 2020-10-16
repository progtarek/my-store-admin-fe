const persistUserData = ({ token, email, lastName, firstName, username }) => {
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('email', email);
  window.localStorage.setItem('lastName', lastName);
  window.localStorage.setItem('username', username);
  window.localStorage.setItem('firstName', firstName);
};

const removeUserData = () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('email');
  window.localStorage.removeItem('lastName');
  window.localStorage.removeItem('username');
  window.localStorage.removeItem('firstName');
};

const generateQueryParams = (params) => {
  return Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&');
};

const updateURLQueryParams = ({ page, limit }) => {
  window.history.replaceState(
    null,
    null,
    `?${generateQueryParams({ page, limit })}`
  );
};

export {
  removeUserData,
  persistUserData,
  generateQueryParams,
  updateURLQueryParams,
};
