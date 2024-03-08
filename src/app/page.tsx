import aboutPhoto from "@/public/about_photo.png";
import Image from "next/image";

export default function Home() {
  return (
    <article className="m-auto my-10 flex flex-col items-center">
      <div className="z-0 mx-60 flex w-4/5 border-2 border-[#CFE1FF] lg:w-3/5">
        <div className="flex flex-col p-4 pb-10 lg:flex-row">
          <div className="relative basis-2/4">
            <div className="relative z-10 border-2 border-[#CFE1FF] bg-white p-4 lg:absolute  lg:right-12 lg:top-10 lg:w-[600px] lg:px-8 lg:py-10">
              <Image
                src={aboutPhoto}
                alt={"about photo"}
                width="400"
                height="300"
                className="w-full object-cover"
              />
            </div>
          </div>
          <article className="flex basis-2/4 flex-col justify-evenly gap-4 p-4 font-monts text-base text-neutral-700">
            <h3 className="flex flex-col italic">
              <span>
                I write about tools. I also write about drinks, and other stuff.
              </span>
              <span>
                Hire me if you want someone to do your writing for you.
              </span>
            </h3>
            <p>
              Hello. I&#39;m a freelance writer, journalist, and content
              creator.
            </p>
            <p className="italic">What does that mean?</p>
            <p>
              I write words for a living, focusing on cool stuff like power
              tools, gardening equipment, home tech and even holidays. It&#39;s
              where I get to work with amazing clients like BBC Gardeners&#39;
              World Magazine and{" "}
              <a
                className="text-blue-600"
                target="_blank"
                href="https://diygarden.co.uk/"
              >
                DIYGarden
              </a>
              .
            </p>
            <p className="italic">What am I good at?</p>
            <p>
              Whether i&#39;s writing in-depth reviews of exciting home and garden
              technology like the latest robotic lawnmower, or helping people
              choose a drill for their next home renovation job, I try to keep
              things clear and conversational.
            </p>
            <p className="italic">Who am I?</p>
            <p>
              I was born in South London but moved down to Exeter in Devon
              nearly a decade ago. It&#39;s a marvellous place to spend time and
              raise a family. I like listening to heavy metal and drinking ruby
              port.
            </p>
          </article>
        </div>
      </div>
    </article>
  );
}
