import React from 'react';

const BrandLogos = () => {
  return (
    <section className="bg-white flex w-full flex-col overflow-hidden items-center text-[19px] text-[rgba(18,10,11,1)] font-medium text-center leading-[34px] justify-center px-20 py-[72px] max-md:max-w-full max-md:px-5">
      <div className="flex w-[1280px] max-w-full flex-col items-stretch">
        <h2 className="self-center max-md:max-w-full">
          Our Trusted Organisations for Internship Collaboration
        </h2>
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/df5860177e95da2abc3fb2e4838254bcd7f80867?placeholderIfAbsent=true"
          alt="Partner organization logos"
          className="aspect-[40] object-contain w-full mt-10 max-md:max-w-full"
        />
      </div>
    </section>
  );
};

export default BrandLogos;
