import React from 'react';

/* 
plava - 64DED2
zelena - 326F69
crna -282828
bela- F5F5F5

 */

const baseStyles = 'px-4 py-2 rounded-2xl font-medium transition-colors duration-300';

const variants = {
  gg: 'bg-[#64DED2] text-[#326F69] hover:bg-[#326F69] hover:text-[#64DED2]',
  wg: 'bg-gray-200 text-[#282828] hover:bg-[#64DED2] hover:text-[#326F69]',
  bg: 'bg-[#282828] text-[#F5F5F5] hover:bg-[#64DED2] hover:text-[#326F69]',
  bgg: 'bg-[#282828] text-[#F5F5F5] hover:bg-[#326F69] hover:text-[#64DED2]',
  bw: 'bg-[#282828] text-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#282828]',
  wb: 'bg-[#F5F5F5] text-[#282828] hover:bg-[#282828] hover:text-[#F5F5F5]',

};

const Button = ({
  type = 'default',
  text,
  className = '',
  href,
  target = '_self',
  rel = 'noopener noreferrer',
  onClick,
}) => {
  const variantStyle = variants[type] || variants.default;
  const combinedClass = `${baseStyles} ${variantStyle} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={combinedClass}>
        {text}
      </a>
    );
  }

  return (
    <button className={combinedClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;