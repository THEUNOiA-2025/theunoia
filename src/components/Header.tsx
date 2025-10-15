import React from 'react';

const Header = () => {
  return (
    <header className="bg-[rgba(248,244,241,1)] self-stretch w-full text-[15px] whitespace-nowrap max-md:max-w-full">
      <div className="bg-[rgba(250,248,246,1)] flex w-full items-stretch gap-5 flex-wrap justify-between px-[73px] py-6 max-md:max-w-full max-md:px-5">
        <nav className="flex items-stretch gap-[40px_85px] text-[rgba(18,10,11,1)] font-medium flex-wrap my-auto max-md:max-w-full">
          <div className="flex items-stretch gap-[3px] text-lg text-black font-bold leading-loose">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/92d972effd43063f68165dc5639029d3b68f7576?placeholderIfAbsent=true"
              alt="THEUNOiA Logo"
              className="aspect-[1.25] object-contain w-[30px] shrink-0"
            />
            <div className="my-auto">THEUNOiA</div>
          </div>
          <div className="leading-[27px] text-center">Work</div>
          <div className="flex items-stretch gap-8 my-auto">
            <div className="leading-loose">Features</div>
            <div className="leading-loose">Contacts</div>
          </div>
        </nav>
        <div className="flex items-stretch gap-[17px] font-bold text-center leading-loose">
          <button className="bg-[rgba(18,10,11,0)] border flex flex-col overflow-hidden items-stretch text-[rgba(18,10,11,1)] justify-center px-12 py-[19px] rounded-[100px] border-black border-solid max-md:px-5 hover:bg-gray-50 transition-colors">
            LogIn
          </button>
          <button className="bg-[rgba(18,10,11,1)] flex flex-col overflow-hidden items-stretch text-[rgba(250,248,246,1)] justify-center px-[47px] py-[18px] rounded-[100px] max-md:px-5 hover:bg-gray-800 transition-colors">
            SignUp
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
