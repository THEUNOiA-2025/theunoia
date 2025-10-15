import React from 'react';

const Hero = () => {
  return (
    <section className="flex w-full flex-col overflow-hidden items-stretch pb-[104px] max-md:max-w-full max-md:pb-[100px]">
      <div className="flex w-full flex-col items-center max-md:max-w-full">
        <div className="bg-white flex w-[283px] max-w-full items-stretch gap-1.5 overflow-hidden mt-[89px] px-[22px] py-[5px] rounded-[100px] max-md:mt-10 max-md:px-5">
          <div className="flex">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/0cc57d49534d4c00e23b9909961e0307c1e85614?placeholderIfAbsent=true"
              alt="Review star"
              className="aspect-[1] object-contain w-[25px] z-10 shrink-0 max-md:-mr-2"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/a0c88b1f58cd88c52c0296624a4a24a443bfa52e?placeholderIfAbsent=true"
              alt="Review star"
              className="aspect-[1] object-contain w-[25px] z-10 shrink-0 max-md:-mr-2"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/d793241951660d8bc0b33bc1f3607bc69de9c903?placeholderIfAbsent=true"
              alt="Review star"
              className="aspect-[1] object-contain w-[26px] self-stretch shrink-0"
            />
          </div>
          <div className="text-[rgba(18,10,11,1)] text-[15px] font-medium leading-[1.8] grow shrink w-[161px] my-auto">
            4900+ 5 Stars Reviews
          </div>
        </div>
        <h1 className="text-[rgba(18,10,11,1)] text-[69px] font-bold leading-[1.2] tracking-[-2px] text-center mt-[37px] max-md:max-w-full max-md:text-[40px]">
          A Platform where Skills
        </h1>
      </div>
      <div className="self-center flex mb-[-21px] w-[961px] max-w-full flex-col ml-[34px] mt-[29px] pt-[57px] max-md:mb-2.5">
        <div className="bg-[rgba(152,134,254,1)] flex flex-col overflow-hidden items-stretch text-[13px] text-white font-medium whitespace-nowrap leading-loose justify-center mt-[57px] p-[11px] rounded-[0px_16px_16px_16px] max-md:mt-10">
          <div>You</div>
        </div>
        <div className="self-center z-10 flex mt-[-87px] w-[635px] max-w-full flex-col items-stretch text-[rgba(18,10,11,1)] font-bold">
          <h2 className="text-[69px] leading-none tracking-[-2px] text-center mr-3 max-md:max-w-full max-md:text-[40px] max-md:mr-2.5">
            Create Opportunity
          </h2>
          <p className="text-[rgba(69,65,64,1)] text-[19px] font-normal leading-loose text-center mt-9 max-md:max-w-full">
            From finding skilled people for your daily needs to helping students learn
          </p>
          <p className="text-[rgba(69,65,64,1)] text-lg font-normal leading-[34px] text-center ml-[11px] mr-[18px] mt-1.5 max-md:max-w-full max-md:mr-2.5">
            and earn — we connect work, learning, and growth in one ecosystem.
          </p>
          <div className="self-center flex w-[533px] max-w-full items-stretch gap-[15px] text-[15px] leading-[27px] flex-wrap mt-6">
            <button className="bg-[rgba(255,216,111,1)] flex flex-col overflow-hidden items-stretch text-base justify-center px-[41px] py-3 rounded-[100px] max-md:px-5 hover:bg-yellow-300 transition-colors">
              Post Work
            </button>
            <button className="bg-white flex flex-col overflow-hidden items-stretch justify-center px-11 py-3 rounded-[100px] max-md:px-5 hover:bg-gray-50 transition-colors">
              Find Work
            </button>
            <button className="bg-[rgba(255,255,255,0)] border flex flex-col overflow-hidden items-stretch justify-center px-[23px] py-3 rounded-[100px] border-[rgba(255,216,111,1)] border-solid max-md:px-5 hover:bg-yellow-50 transition-colors">
              Explore Internship
            </button>
          </div>
        </div>
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/676c30ae9e253ef47d7b6283338c34d314654e80?placeholderIfAbsent=true"
          alt="Decorative element"
          className="aspect-[1.33] object-contain w-[89px] z-10 mr-[69px] mt-6 max-md:mr-2.5"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/526d243cb5ae523a9deb28e7614bc18da4d1ed39?placeholderIfAbsent=true"
          alt="Decorative element"
          className="aspect-[1.33] object-contain w-[92px] mt-[-43px] max-md:ml-[9px]"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/19fb853e5e73b8e2fa5272861742f9cfd3a538de?placeholderIfAbsent=true"
          alt="Platform dashboard preview"
          className="aspect-[1.45] object-contain w-[876px] max-w-full rounded-[32px]"
        />
      </div>
    </section>
  );
};

export default Hero;
