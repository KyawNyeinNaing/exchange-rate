import React from 'react';

type Props = {
  name?: string;
  addonIcon?: JSX.Element;
};

const Input: React.FC<Props> = ({ name, ...rest }: Props) => {
  return (
    <div className="relative mt-2 rounded-md shadow-sm">
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        aria-describedby="price-currency"
        type="text"
        name={name}
        {...rest}
      />
    </div>
  );
};

export default Input;
