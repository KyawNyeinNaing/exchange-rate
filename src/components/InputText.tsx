import React from 'react';

type Props = {
  value: string;
  name?: string;
  addonIcon?: JSX.Element;
  readOnly?: boolean;
  className?: string;
};

const InputText: React.FC<Props> = ({ name, className, ...rest }: Props) => {
  return (
    <div className={`relative rounded-md shadow-sm ${className}`}>
      <input
        className="block w-full h-[40px] rounded-md border-0 py-1.5 pl-3 pr-3 outline-none text-gray-900 outline-0 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        aria-describedby="price-currency"
        type="text"
        name={name}
        {...rest}
      />
    </div>
  );
};

export default InputText;
