'use client';
import React from 'react';
import AutoComplete from '@/components/Combobox';
import Button from '@/components/Button';
import InputNumber from '@/components/InputNumber';
import { Typography } from '@material-tailwind/react';
import { CurrencyList, CurrencyLive } from '@/types/currency';

type Props = {
  currencies: CurrencyList;
};

const ExchangeRate: React.FC<Props> = ({ currencies }: Props) => {
  // split key and value
  const resultData = Object?.entries(currencies)?.reduce((result, [key, value]) => {
    result = [
      ...result,
      {
        key,
        value,
      },
    ];
    return result;
  }, [] as { key: string; value: string }[]);

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-4 col-span-6">
        <div className="h-screen flex justify-center items-center">
          <div className="bg-white rounded-[6px] p-[40px] space-y-[24px]">
            <h3 className="text-black text-center text-[24px]">Currency Exchange Rates</h3>
            <div className="flex flex-col items-center gap-y-[16px] space-y-[16px]">
              <div className="flex justify-start gap-x-[24px]">
                <AutoComplete values={resultData} />
                <InputNumber min={1} />
              </div>
              <div className="flex justify-start gap-x-[24px]">
                <AutoComplete values={resultData} />
                <InputNumber min={1} />
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
