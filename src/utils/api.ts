interface ParameterType {
  [key: string]: string | string[];
}

export class FetchAPI {
  apiDomain: string = "apilayer.net";
  accessKey: string;

  constructor(accessKey: string) {
    this.apiDomain = `http://${this.apiDomain}/api`;
    this.accessKey = accessKey;
  }

  async sendApiRequest(
    path: string,
    parameters: ParameterType,
    method: string = "GET"
  ) {
    parameters["access_token"] = this.accessKey;
    const queryString = new URLSearchParams(parameters as any);

    return await fetch(
      `${this.apiDomain}/${path}?access_key=${
        this.accessKey
      }&${queryString.toString()}`,
      {
        method
      }
    )
      .then(async (r) => {
        const res = await r.json();
        return res;
      })
      .catch((e) => {
        console.log("ERROR ==>", JSON.stringify(e));
        throw new Error(e?.message);
      });
  }

  async getLive(path: string, params: ParameterType = {}) {
    return await this.sendApiRequest(path, params);
  }

  async getCurrenciesLists(path: string, params: ParameterType = {}) {
    return await this.sendApiRequest(path, params);
  }
}
