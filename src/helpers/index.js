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

const setupPagination = (c, m) => {
  const current = c;
  const last = m;
  const delta = 2;
  const left = current - delta;
  const right = current + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

export {
  setupPagination,
  removeUserData,
  persistUserData,
  generateQueryParams,
  updateURLQueryParams,
};
