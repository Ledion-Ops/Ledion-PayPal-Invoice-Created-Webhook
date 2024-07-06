const axios = require("axios");
const qs = require("qs");

exports.handler = async (event) => {
  const invoiceId = event.pathParameters.invoiceId;
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  const tokenResponse = await axios.post(
    "https://api-m.paypal.com/v1/oauth2/token",
    qs.stringify({ grant_type: "client_credentials" }),
    {
      auth: {
        username: clientId,
        password: clientSecret,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const paypalAccessToken = tokenResponse.data.access_token;

  console.log(event);
  console.log(invoiceId);
  console.log(event.pathParameters);

  // Fetch Invoice Data
  const response = await axios.get(
    `https://api-m.paypal.com/v2/invoicing/invoices/${invoiceId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalAccessToken}`,
      },
    }
  );

  console.log(response);

  const invoice = response.data;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoice),
  };
};
