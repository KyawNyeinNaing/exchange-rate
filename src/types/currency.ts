export interface CurrencyList {
  currencies: {
    [key: string]: string;
  };
  privacy?: string;
  success?: boolean;
  terms?: string;
}

export interface CurrencyLive {
  currencies: {
    [key: string]: number;
  };
  source: string;
  privacy?: string;
  success?: boolean;
  terms?: string;
  timestamp?: number;
}
