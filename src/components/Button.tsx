'use client';

import { Button as MTButton } from '@material-tailwind/react';

type Props = {
  onClick?: () => void;
};

const Button: React.FC<Props> = ({ onClick }: Props) => {
  return (
    <MTButton className="bg-gray-800" onClick={onClick}>
      Swap Currency
    </MTButton>
  );
};

export default Button;
