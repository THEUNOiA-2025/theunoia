import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <footer className="bg-primary flex w-full flex-col items-center pt-80 pb-20 px-5 md:px-20 max-md:pt-24">
      <div className="w-[1140px] max-w-full">
        <div className="bg-[rgba(255,255,255,0.002)] shadow-[0px_1px_2px_rgba(0,0,0,0.4)] flex gap-[40px_85px] overflow-hidden font-normal flex-wrap pt-2 pb-24 max-md:max-w-full">
          <div className="text-primary-foreground text-base leading-relaxed grow shrink w-80 mt-10">
            Streamline your workflow, manage projects, <br />
            and empower your team.
          </div>
          <nav className="flex flex-col text-[17px] text-[rgba(248,244,241,1)] leading-[1.8]">
            <div className="font-medium leading-loose">Quick Links</div>
            <a href="#" className="mt-[33px] hover:text-white transition-colors">Home</a>
            <a href="#" className="mt-[33px] hover:text-white transition-colors">Pricing</a>
            <a href="#" className="mt-[30px] hover:text-white transition-colors">Changelog</a>
            <a href="#" className="text-base leading-loose self-stretch mt-[31px] hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="leading-loose mt-[30px] hover:text-white transition-colors">404 Page</a>
          </nav>
          <nav className="flex flex-col text-[17px] text-[rgba(248,244,241,1)]">
            <div className="font-medium leading-loose">Company</div>
            <a href="#" className="leading-loose mt-[31px] hover:text-white transition-colors">About Us</a>
            <a href="#" className="leading-loose self-stretch mt-[34px] max-md:mr-2 hover:text-white transition-colors">Contact Us</a>
            <a href="#" className="text-base leading-loose self-stretch mt-[35px] hover:text-white transition-colors">Testimonials</a>
            <a href="#" className="text-base leading-loose mt-[35px] hover:text-white transition-colors">Features</a>
            <a href="#" className="leading-loose mt-[33px] hover:text-white transition-colors">Blog</a>
          </nav>
          <div className="font-medium">
            <div className="text-[rgba(248,244,241,1)] text-[17px] leading-[31px]">
              Stay updated with our latest <br />
              news and tips!
            </div>
            <form onSubmit={handleSubscribe} className="bg-white flex items-stretch gap-5 overflow-hidden text-[15px] justify-between mt-[30px] px-4 py-3 rounded-[61px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="text-[#120a0b] my-auto bg-transparent outline-none flex-1"
                required
              />
              <button
                type="submit"
                className="bg-[rgba(152,134,254,1)] flex flex-col overflow-hidden items-stretch text-white whitespace-nowrap text-center leading-loose justify-center px-[25px] py-4 rounded-[88px] max-md:px-5 hover:bg-purple-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="flex items-stretch gap-5 text-[15px] text-[rgba(248,244,241,1)] font-medium leading-[27px] flex-wrap justify-between mt-[25px] max-md:max-w-full">
          <div className="w-[296px]">
            © 2024 THEUNOiA, Inc. All rights reserved.
          </div>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/285e8d08f9f871ba69f294bde55b712884344a3e?placeholderIfAbsent=true"
            alt="Social media links"
            className="aspect-[4.61] object-contain w-[92px] shrink-0 my-auto"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
