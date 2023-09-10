export interface CurrencyList {
  currencies: {
    [key: string]: string;
  };
  privacy?: string;
  success?: boolean;
  terms?: string;
}

export interface CurrencyLive {
  quotes: {
    [key: string]: number;
  };
  source: string;
  privacy?: string;
  success?: boolean;
  terms?: string;
  timestamp?: number;
}

export interface Rates {
  rates: {
    [key: string]: string;
  };
  valid?: boolean;
  updated?: number;
  base?: string;
}
