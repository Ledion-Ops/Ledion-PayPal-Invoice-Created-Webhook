const { WebClient } = require("@slack/web-api");

const slackToken = process.env.SLACK_ACCESS_TOKEN;
const slackChannel = "#linear-updates";

const slackClient = new WebClient(slackToken);

exports.handler = async (event) => {
  console.log(event);

  try {
    await slackClient.chat.postMessage({
      channel: slackChannel,
      text: `New event received: ${JSON.stringify(event)}`,
    });
    console.log("Message sent to Slack");
  } catch (error) {
    console.error("Error sending message to Slack:", error);
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  };
};
