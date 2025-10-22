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
    <footer className="bg-black flex w-full flex-col items-center pt-80 pb-20 px-5 md:px-20 max-md:pt-24">
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
          <div className="flex items-center gap-4 my-auto">
            <a href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="X (Twitter)">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
