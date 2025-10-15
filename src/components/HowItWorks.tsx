import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/1f395db4e05f764d600b58f5486f0b63a2d34e83?placeholderIfAbsent=true",
      title: "Post Your Requirement",
      description: "List what you need — be it tech help, home repair, design work, or tutoring.",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/87844c8bbdd86b41c874e436d5bfedd53b1bd851?placeholderIfAbsent=true"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/c06c9edddbd1f5be28e2d73e254a9dd502b08070?placeholderIfAbsent=true",
      title: "Get Skilled Bids",
      description: "Skilled freelancers will bid on your project. Review offers, chat, and pick the best fit.",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/d3ee89c2f191e78781ba79733c593b722a47d7d6?placeholderIfAbsent=true"
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/6b46653cd469d4db0bf6df7957f4e7e6d8143f62?placeholderIfAbsent=true",
      title: "Get It Done — Hassle-Free",
      description: "Your chosen professional completes the task securely, while you track progress.",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/185c9b7e9f9a70304e6678727553f6bcb72e8179?placeholderIfAbsent=true",
      bottomImage: "https://api.builder.io/api/v1/image/assets/TEMP/765a6e094228c45ea640e2b13ec863e41f741001?placeholderIfAbsent=true"
    }
  ];

  return (
    <section className="bg-white flex w-full flex-col items-center pt-[74px] px-20 max-md:max-w-full max-md:px-5">
      <div className="flex w-[1200px] max-w-full flex-col items-center">
        <h2 className="text-[rgba(18,10,11,1)] text-[53px] font-bold leading-none tracking-[-1.5px] text-center max-md:text-[40px]">
          How It Works
        </h2>
        <p className="text-[rgba(69,65,64,1)] text-[17px] font-normal leading-[31px] text-center mt-[39px] max-md:max-w-full">
          Getting things done is simple. Just post what you need, receive bids from skilled individuals, and pick the one that fits your budget and timeline.
        </p>
        <div className="self-stretch mt-[65px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {steps.map((step, index) => (
              <article key={index} className="w-[33%] max-md:w-full max-md:ml-0">
                <div className="bg-[rgba(248,244,241,1)] flex grow flex-col overflow-hidden w-full px-[26px] py-[46px] rounded-[25px] max-md:mt-6 max-md:px-5">
                  <img
                    src={step.icon}
                    alt={`${step.title} icon`}
                    className="aspect-[1] object-contain w-[60px] rounded-[14px]"
                  />
                  <h3 className="text-[rgba(18,10,11,1)] text-[19px] font-bold leading-loose mt-[25px]">
                    {step.title}
                  </h3>
                  <p className="text-[rgba(69,65,64,1)] text-[15px] font-normal leading-[27px] mt-[29px]">
                    {step.description}
                  </p>
                  <img
                    src={step.image}
                    alt={`${step.title} illustration`}
                    className="aspect-[1.54] object-contain w-full self-stretch mt-[51px] rounded-xl max-md:mt-10"
                  />
                  {step.bottomImage && (
                    <img
                      src={step.bottomImage}
                      alt="Additional illustration"
                      className="aspect-[6.58] object-contain w-[290px] self-center max-w-full mt-3.5"
                    />
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
