'use client';
import React, { useEffect, useState } from 'react';
import AutoComplete from '@/components/Combobox';
import Button from '@/components/Button';
import InputNumber from '@/components/InputNumber';
import { Typography } from '@material-tailwind/react';
import { CurrencyList, CurrencyLive, Rates } from '@/types/currency';
import InputText from '@/components/InputText';
import { SELECTED_VALUE } from '@/utils/enum';

const ExchangeRate: React.FC<CurrencyList & Rates> = ({ currencies, rates }: CurrencyList & Rates) => {
  const [destinationValue, setDestinationValue] = useState<number>(0);
  const [sourceCurrency, setSourceCurrency] = useState<string>(SELECTED_VALUE.USD.toUpperCase());
  const [destinationCurrency, setDestinationCurrency] = useState<string>(SELECTED_VALUE.MMK.toUpperCase());
  const [sourceValue, setSourceValue] = useState(1);

  useEffect(() => {
    calculateExchangeRate(2);
  }, [destinationCurrency, sourceCurrency]);

  // split key and value
  const list = Object?.entries(currencies)?.reduce((result, [key, value]) => {
    result = [
      ...result,
      {
        key,
        value,
      },
    ];
    return result;
  }, [] as { key: string; value: string }[]);

  const calculateExchangeRate = (val: number) => {
    if (sourceCurrency !== 'Currency' && destinationCurrency !== 'Currency') {
      setSourceValue(val);
      setDestinationValue(Number(parseFloat(val * (rates[destinationCurrency] / rates[sourceCurrency])).toFixed(2)));
    } else {
      alert('Please Select Currencies');
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-4 col-span-6">
        <div className="h-screen flex justify-center items-center">
          <div className="bg-white rounded-[6px] p-[40px] space-y-[24px]">
            <h3 className="text-black text-center text-[24px]">Currency Exchange Rates</h3>
            <div className="flex flex-col items-center gap-y-[16px] space-y-[16px]">
              <div className="flex justify-start gap-x-[24px]">
                <AutoComplete values={list} getValue={setSourceCurrency} />
                <InputNumber min={1} onChange={event => calculateExchangeRate(event.target.value as number)} />
              </div>
              <div className="flex justify-start gap-x-[24px]">
                <AutoComplete values={list} getValue={setDestinationCurrency} />
                <InputText value={destinationValue.toString()} readOnly />
              </div>
            </div>
            <div>
              <Typography color="black" className="font-[500]">
                MMK - USD (Rate - 1000)
              </Typography>
              <Typography color="black" className="text-[12px] font-[400]">
                Last Updated: Sat, 09 Sep 2023 23:07:22 GMT
              </Typography>
            </div>
            <div className="flex justify-center">
              <Button />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRate;
