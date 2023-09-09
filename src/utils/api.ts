export enum Platforms {
  Messenger = "messenger",
  Instagram = "instagram"
}

export class Messenger {
  apiDomain: string = "graph.facebook.com";
  apiVersion: string = "16.0";
  apiUrl: string;
  platform: Platforms;
  pageId: string;
  accessToken: string;

  constructor(platform: Platforms, pageId: string, accessToken: string) {
    this.apiUrl = `https://${this.apiDomain}/v${this.apiVersion}`;
    this.platform = platform;
    this.pageId = pageId;
    this.accessToken = accessToken;
  }

  async sendApiRequest(
    api: string,
    parameters: { [key: string]: string | string[] },
    method: string = "GET"
  ) {
    parameters["access_token"] = this.accessToken;
    const queryString = new URLSearchParams(parameters as any);
    return await fetch(`${this.apiUrl}/${api}?${queryString.toString()}`, {
      method
    })
      .then((r) => r.json())
      .catch((e) => {
        console.log("ERROR ==>", JSON.stringify(e));
        throw new Error(e?.message);
      });
  }

  async getConversations() {
    return await this.sendApiRequest(`${this.pageId}/conversations`, {
      platform: this.platform
    });
  }

  async getConversationMessages(conversationId: string) {
    return await this.sendApiRequest(`${conversationId}`, {
      fields: ["id", "messages"]
    });
  }

  async getMessageDetails(messageId: string) {
    return await this.sendApiRequest(`${messageId}`, {
      fields: ["id", "to", "from", "message"]
    });
  }

  async sendTextMessage(userId: string, message: string) {
    return await this.sendApiRequest(
      `${this.pageId}/messages`,
      {
        recipient: JSON.stringify({ id: userId }),
        messaging_type: "RESPONSE",
        message: JSON.stringify({ text: message })
      },
      "POST"
    );
  }

  async sendImage(userId: string, imageUrl: string) {
    return await this.sendApiRequest(
      `${this.pageId}/messages`,
      {
        recipient: JSON.stringify({ id: userId }),
        messaging_type: "RESPONSE",
        message: JSON.stringify({
          attachment: {
            type: "image",
            payload: {
              url: imageUrl
            }
          }
        })
      },
      "POST"
    );
  }

  async getUserProfile(userId: string) {
    return await this.sendApiRequest(`${userId}`, {
      fields: ["id", "first_name", "last_name", "profile_pic"]
    });
  }

  async getTestUser() {
    //`https://graph.facebook.com/v17.0/1095812404712732/accounts?access_token=d1783b0174479d318e8fd1bd84902eb8`,
    // curl -i -X GET \
    //"https://graph.facebook.com/v17.0/1095812404712732/accounts?fields=login_url&access_token=1095812404712732%7C7Z-p8YFXhUtcsbhNfb6pME_VqoU"
    return await fetch(
      `https://graph.facebook.com/v17.0/1095812404712732/accounts?fields=logins_url&access_token=1095812404712732%7C7Z-p8YFXhUtcsbhNfb6pME_VqoU`,
      {
        method: "GET"
      }
    ).then((r) => r.json());
  }
}
