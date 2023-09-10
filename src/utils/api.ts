interface ParameterType {
  [key: string]: string | string[];
}

export class FetchAPI {
  constructor() {}

  async sendApiRequest(path: string, parameters: ParameterType, apiDomain: string, method: string = 'GET') {
    const queryString = new URLSearchParams(parameters as any);

    return await fetch(`${apiDomain}/${path}?${queryString.toString()}`, {
      method,
    })
      .then(async r => {
        const res = await r.json();
        return res;
      })
      .catch(e => {
        console.log('ERROR ==>', JSON.stringify(e));
        throw new Error(e?.message);
      });
  }

  async getLive(
    path: string,
    params: ParameterType = {
      access_key: '48da1f6e032599b655161fceff498c5e',
    }
  ) {
    return await this.sendApiRequest(path, params, 'http://apilayer.net');
  }

  async getCurrenciesLists(
    path: string,
    params: ParameterType = {
      access_key: '48da1f6e032599b655161fceff498c5e',
    }
  ) {
    return await this.sendApiRequest(path, params, 'http://apilayer.net');
  }

  async getRates(
    path: string,
    params: ParameterType = {
      key: '4eNFMF5n4W5lUCfCoHNwC5tjrcfHlc1NsDwI',
    }
  ) {
    return await this.sendApiRequest(path, params, 'https://currencyapi.net');
  }
}
