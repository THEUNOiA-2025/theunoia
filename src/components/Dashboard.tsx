import React from 'react';

const Dashboard = () => {
  return (
    <section className="bg-white flex w-full flex-col overflow-hidden items-center pt-[131px] px-20 max-md:max-w-full max-md:pt-[100px] max-md:px-5">
      <div className="flex w-[1200px] max-w-full flex-col items-center">
        <h2 className="text-[rgba(18,10,11,1)] text-[53px] font-bold leading-none tracking-[-1.5px] text-center max-md:max-w-full max-md:text-[40px]">
          A clear and intuitive dashboard
        </h2>
        <p className="text-[rgba(69,65,64,1)] text-[17px] font-normal leading-loose text-center mt-[39px] max-md:max-w-full">
          Simplify project planning, streamline collaboration, and boost productivity.
        </p>
        <article className="bg-[rgba(152,134,254,1)] self-stretch overflow-hidden mt-[66px] pl-[60px] pt-[46px] pb-6 rounded-3xl max-md:max-w-full max-md:mt-10 max-md:pl-5">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-6/12 max-md:w-full max-md:ml-0">
              <div className="flex w-full flex-col mt-6 max-md:max-w-full max-md:mt-10">
                <div className="self-stretch flex items-stretch gap-5 flex-wrap justify-between max-md:max-w-full">
                  <div className="flex flex-col items-stretch">
                    <div className="bg-[rgba(201,255,133,1)] flex flex-col overflow-hidden items-stretch text-[13px] text-[rgba(18,10,11,1)] font-medium leading-[1.8] justify-center px-4 py-[9px] rounded-2xl">
                      <div>Dashboard Overview</div>
                    </div>
                    <h3 className="text-white text-[38px] font-bold leading-none tracking-[-1px] mt-[27px]">
                      Intuitive dashboard
                    </h3>
                  </div>
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/b158f79f027dc5d46be48138124282499b612754?placeholderIfAbsent=true"
                    alt="Dashboard icon"
                    className="aspect-[5.49] object-contain w-[66px] shrink-0 mt-[68px] max-md:mt-10"
                  />
                </div>
                <p className="text-white text-[15px] font-medium leading-[27px] mt-[30px] max-md:max-w-full">
                  THEUNOiA's dashboard is designed to give you everything you need at a <br />
                  glance. With a clean, modern interface, you can monitor.
                </p>
                <div className="flex w-[457px] max-w-full items-stretch gap-[40px_59px] text-white font-bold mt-[54px] max-md:mt-10">
                  <div className="flex items-stretch gap-2.5 text-lg leading-loose flex-1">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/2647d89ac28dd3ee4211a101db7d0e0ff9d0f5a6?placeholderIfAbsent=true"
                      alt="Personalized task icon"
                      className="aspect-[1] object-contain w-8 shrink-0"
                    />
                    <div className="basis-auto my-auto">Personalized task</div>
                  </div>
                  <div className="flex items-stretch gap-2.5 text-[19px] leading-loose flex-1">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/1c51346ce7eaed34468f3bcad93a4b1a6e1da9b7?placeholderIfAbsent=true"
                      alt="Project overview icon"
                      className="aspect-[1] object-contain w-8 shrink-0"
                    />
                    <div className="basis-auto my-auto">Project overview</div>
                  </div>
                </div>
                <div className="flex items-stretch gap-[40px_45px] text-[15px] text-white font-medium leading-[27px] mt-3">
                  <div>
                    Easily move between different <br />
                    sections messages.
                  </div>
                  <div>
                    See your daily tasks upcoming <br />
                    deadlines in a section.
                  </div>
                </div>
                <div className="bg-white w-[536px] max-w-full overflow-hidden mt-[53px] px-[25px] py-6 rounded-3xl max-md:mt-10 max-md:px-5">
                  <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                    <div className="w-[23%] max-md:w-full max-md:ml-0">
                      <div className="flex flex-col self-stretch items-stretch text-[rgba(18,10,11,1)] whitespace-nowrap my-auto max-md:mt-10">
                        <div className="text-[56px] font-bold leading-[1.2] tracking-[-1.5px] self-center max-md:text-[40px]">
                          6%
                        </div>
                        <div className="text-[17px] font-medium leading-[1.8] mt-[22px]">
                          Improvement
                        </div>
                      </div>
                    </div>
                    <div className="w-[77%] ml-5 max-md:w-full max-md:ml-0">
                      <p className="text-[rgba(69,65,64,1)] text-[15px] font-medium leading-[27px] max-md:mt-10">
                        Experience the simplicity and power of <br />
                        THEUNOiA's dashboard. Stay on top of your <br />
                        projects and boost your productivity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/f32873261c4a20f0aea98b216ad75445e0d1dad2?placeholderIfAbsent=true"
                alt="Dashboard interface preview"
                className="aspect-[0.83] object-contain w-full grow rounded-3xl max-md:max-w-full max-md:mt-10"
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Dashboard;
