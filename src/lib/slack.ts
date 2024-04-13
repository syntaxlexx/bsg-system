import { env } from "@/env";
import { siteInfo } from "./constants";

const slackEnabled = env.SLACK_ENABLED;
const channel = "#system-monitoring";

/**
 * https://api.slack.com/reference/messaging/attachments#fields
 * @param e
 * @returns
 */
export const sendErrorToSlack = async (e: any) => {
  if (!slackEnabled) return;

  console.log("sending to slack");
  const msg = {
    channel: channel,
    attachments: [
      {
        mrkdwn_in: ["text"],
        color: "#ff0000",
        pretext: `:warning: An error/exception occurred in your WebApp: ${siteInfo.name}`,
        author_name: siteInfo.name,
        author_link: env.APP_URL,
        // author_icon: `${env.APP_URL}/favicon.ico`,
        title: `:warning: An error/exception occurred in your WebApp: ${env.APP_URL}`,
        // title_link: "https://api.slack.com/",
        // text: e,
        fields: [
          {
            title: "Message",
            value: e?.message,
            short: false,
          },
          {
            title: "Error",
            value: e?.toString(),
            short: false,
          },
        ],
        // thumb_url: "http://placekitten.com/g/200/200",
        footer: `${env.APP_URL}`,
        // footer_icon:
        //   "https://platform.slack-edge.com/img/default_application_icon.png",
        // ts: 123456789,
      },
    ],
  };

  try {
    const resp = await fetch(env.SLACK_WEBHOOK!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msg),
    });

    if (resp.ok) {
      console.log("sent to slack");
    } else {
      console.log("error sending to slack");
    }
  } catch (error) {
    console.log("error sending to slack");
  }
};
