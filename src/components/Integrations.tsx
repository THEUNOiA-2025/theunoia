import React from 'react';

const Integrations = () => {
  return (
    <section className="bg-white flex w-full flex-col items-center text-[rgba(18,10,11,1)] font-bold pt-[142px] px-20 max-md:max-w-full max-md:pt-[100px] max-md:px-5">
      <div className="flex w-[1080px] max-w-full flex-col items-center">
        <h2 className="text-[54px] leading-none tracking-[-1.5px] text-center max-md:text-[40px]">
          Integrations with{" "}
        </h2>
        <h2 className="text-[52px] leading-none tracking-[-1.5px] text-center mt-3.5 max-md:max-w-full max-md:text-[40px]">
          your favorite tools
        </h2>
        <p className="text-[rgba(69,65,64,1)] text-[17px] font-normal leading-loose text-center mt-[29px] max-md:max-w-full">
          Simplify project planning, streamline collaboration, and boost productivity{" "}
        </p>
        <p className="text-[rgba(69,65,64,1)] text-[17px] font-normal leading-[31px] text-center mt-1.5">
          all with THEUNOiA task management solution
        </p>
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/1eda6933a10e92a9d9c6b29fff694b3c6619feef?placeholderIfAbsent=true"
          alt="Integration tools logos"
          className="aspect-[4.1] object-contain w-full self-stretch mt-[60px] max-md:max-w-full max-md:mt-10"
        />
        <button className="border flex w-[232px] max-w-full flex-col items-stretch text-[15px] leading-[1.8] justify-center mt-[60px] px-[31px] py-[18px] rounded-[100px] border-[rgba(69,65,64,0.5)] border-solid max-md:mt-10 max-md:px-5 hover:bg-gray-50 transition-colors">
          Explore All Integrations
        </button>
      </div>
    </section>
  );
};

export default Integrations;
