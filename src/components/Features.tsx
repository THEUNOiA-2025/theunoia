import React from 'react';

const Features = () => {
  return (
    <section className="bg-white flex w-full flex-col items-center pt-[126px] px-20 max-md:max-w-full max-md:pt-[100px] max-md:px-5">
      <div className="flex w-[1200px] max-w-full flex-col items-center">
        <h2 className="text-[rgba(18,10,11,1)] text-[53px] font-bold leading-[67px] tracking-[-1.5px] text-center max-md:max-w-full max-md:text-[40px] max-md:leading-[56px]">
          Powerful features to <br />
          boost your work
        </h2>
        <p className="text-[rgba(69,65,64,1)] text-[17px] font-normal leading-loose text-center mt-[29px] max-md:max-w-full">
          Simplify project planning, streamline collaboration, and boost productivity{" "}
        </p>
        <p className="text-[rgba(69,65,64,1)] text-[17px] font-normal leading-[31px] text-center mt-1.5">
          all with THEUNOiA task management solution
        </p>
        <div className="self-stretch mt-[59px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <article className="w-6/12 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(152,134,254,1)] flex grow flex-col overflow-hidden text-white font-medium w-full p-10 rounded-[25px] max-md:max-w-full max-md:mt-6 max-md:px-5">
                <div className="bg-white flex flex-col overflow-hidden items-stretch text-[13px] text-[rgba(69,65,64,1)] leading-[1.8] justify-center px-4 py-2 rounded-2xl">
                  <div>In-app chat and real-time feedback</div>
                </div>
                <h3 className="text-[34px] font-bold tracking-[-1px] mt-[27px]">
                  Effortless Project Posting
                </h3>
                <p className="text-[15px] leading-[27px] mt-[26px] max-md:max-w-full">
                  Post your requirement in minutes — whether it's a website fix, or creative project. Add details, budget, and watch the bids roll in.
                </p>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/cc57800e6c3f9cdcb88b6b4888a08627af443194?placeholderIfAbsent=true"
                  alt="Project posting interface"
                  className="aspect-[1.4] object-contain w-full self-stretch mt-[38px] max-md:max-w-full"
                />
              </div>
            </article>
            <article className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="bg-[rgba(255,216,111,1)] flex grow flex-col overflow-hidden items-stretch text-[rgba(18,10,11,1)] font-medium w-full p-10 rounded-[25px] max-md:max-w-full max-md:mt-6 max-md:px-5">
                <div className="bg-white flex flex-col overflow-hidden items-stretch text-[13px] text-[rgba(69,65,64,1)] leading-loose justify-center px-4 py-2 rounded-2xl">
                  <div>Task completion percentages for each task</div>
                </div>
                <h3 className="text-[34px] font-bold leading-none tracking-[-1px] mt-[27px]">
                  Smart Bidding System
                </h3>
                <p className="text-[15px] leading-[27px] mr-[29px] mt-[26px] max-md:max-w-full max-md:mr-2.5">
                  Skilled freelancers and professionals bid for your project. Compare offers, chat directly, and choose the one that fits your needs.
                </p>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/817a6b52b93df25b1ed23a846a90bb8da6ccb7f6?placeholderIfAbsent=true"
                  alt="Bidding system interface"
                  className="aspect-[1.4] object-contain w-full mt-[38px] max-md:max-w-full"
                />
              </div>
            </article>
          </div>
        </div>
        <article className="bg-[rgba(201,255,133,1)] self-stretch overflow-hidden mt-6 p-10 rounded-[25px] max-md:max-w-full max-md:px-5">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-[45%] max-md:w-full max-md:ml-0">
              <div className="flex flex-col self-stretch text-[rgba(69,65,64,1)] font-medium my-auto max-md:max-w-full max-md:mt-10">
                <div className="bg-white flex flex-col overflow-hidden items-stretch text-[13px] leading-loose justify-center px-4 py-2 rounded-2xl">
                  <div>Daily, weekly, and monthly views for planning</div>
                </div>
                <h3 className="text-[rgba(18,10,11,1)] text-[34px] font-bold leading-[50px] tracking-[-1px] mt-7">
                  Track Work & Get It Done On Time
                </h3>
                <p className="text-[15px] leading-[27px] self-stretch mt-[33px] max-md:max-w-full">
                  Stay updated as your chosen professional completes the task securely and on time. Track progress, communicate, and manage everything
                </p>
                <button className="bg-[rgba(18,10,11,1)] flex flex-col overflow-hidden items-stretch text-base text-white font-bold leading-loose justify-center mt-[45px] px-[30px] py-5 rounded-[100px] max-md:mt-10 max-md:px-5 hover:bg-gray-800 transition-colors">
                  Book a Demo
                </button>
              </div>
            </div>
            <div className="w-[55%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex flex-col relative min-h-[468px] w-full overflow-hidden text-[13px] text-white font-medium whitespace-nowrap leading-[1.8] pt-[157px] pb-[255px] px-[70px] max-md:max-w-full max-md:mt-10 max-md:px-5 max-md:py-[100px]">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/17ce5205b3001d63862a50784c25bbb06e3d0537?placeholderIfAbsent=true"
                  alt="Work tracking interface"
                  className="absolute h-full w-full object-cover inset-0"
                />
                <div className="relative flex items-start gap-[3px]">
                  <div className="bg-[rgba(152,134,254,1)] flex flex-col overflow-hidden items-stretch justify-center mt-[26px] px-[17px] py-2.5 rounded-[16px_0px_16px_16px]">
                    <div>Charles</div>
                  </div>
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/1f79dcb76b4cbbbbce53b41114600d6941770953?placeholderIfAbsent=true"
                    alt="Chat indicator"
                    className="aspect-[0.89] object-contain w-6 shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Features;
