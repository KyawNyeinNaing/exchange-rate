export type CurrencyList = {
  currencies: {
    [key: string]: string;
  };
  privacy?: string;
  success?: boolean;
  terms?: string;
  lastUpdated?: string;
};

export type CurrencyLive = {
  quotes: {
    [key: string]: number;
  };
  source: string;
  privacy?: string;
  success?: boolean;
  terms?: string;
  timestamp?: number;
  lastUpdated?: string;
};

export type Rates = {
  rates: {
    [key: string]: string;
  };
  valid?: boolean;
  updated?: number;
  base?: string;
  lastUpdated?: string;
};

export type ApiResponse = {
  currencies: {
    [key: string]: string;
  };
  privacy: string;
  success: boolean;
  terms: string;
  rates: {
    [key: string]: string;
  };
  valid: boolean;
  updated: number;
  base: string;
  lastUpdated: string;
  quotes: {
    [key: string]: number;
  };
  source: string;
};
