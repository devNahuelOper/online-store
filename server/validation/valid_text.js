const validText = str => typeof str === "string" && Boolean(str.trim());

module.exports = validText;