export const constructAPIURL = function (endpoint) {
  return `${process.env.REACT_APP_API_URI}${endpoint}`;
};
