'use client';
import React from 'react';

type Props = {
  name?: string;
  addonIcon?: JSX.Element;
  min?: number;
  max?: number;
  onChange?: (arg?: any) => void;
  sourceCurrency?: string;
};

const InputNumber: React.FC<Props> = ({ name, addonIcon, onChange, sourceCurrency, ...rest }: Props) => {
  return (
    <div className="relative mt-2 rounded-md shadow-sm">
      {addonIcon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{addonIcon}</div>
      )}
      <input
        className={`block w-full rounded-md border-0 py-1.5 ${
          addonIcon ? 'pl-7' : 'pl-3'
        } pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6`}
        placeholder="0.00"
        aria-describedby="price-currency"
        type="number"
        name={name}
        onChange={onChange}
        onKeyPress={e => {
          const validCharacters = /^[0-9\b]+$/;
          if (!validCharacters.test(e.key)) {
            e.preventDefault();
          }
        }}
        {...rest}
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <span className="text-gray-500 sm:text-sm" id="price-currency">
          {sourceCurrency}
        </span>
      </div>
    </div>
  );
};

export default InputNumber;
