const emailRegExp = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;
const urlRegExp = /https?:\/\/w{0,3}\.?\S+\.\S+/;
const idRegExp = /[a-z0-9]{24}/;
module.exports = { emailRegExp, urlRegExp, idRegExp };
