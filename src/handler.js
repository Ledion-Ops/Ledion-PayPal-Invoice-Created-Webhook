const axios = require("axios");
const qs = require("qs");

exports.handler = async (event) => {
  console.log(event);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoice),
  };
};
