export const generateLink = (searchParam) =>
  `https://www.google.com/search?q=${searchParam.replaceAll(' ', '+')}`;
