import aboutPhoto from "@/public/about_photo.png"
import Image from "next/image";

export default function Home() {
  return (
    <article className="m-auto my-10 flex flex-col items-center">
      <div className="z-0 mx-60 flex border-2 border-[#CFE1FF] w-4/5 lg:w-3/5">
        <div className="flex flex-col lg:flex-row p-4 pb-10">
          <div className="relative basis-2/4">
            <div className="relative lg:absolute bg-white lg:w-[600px] lg:top-10 lg:right-12 z-10  border-2 border-[#CFE1FF] p-4 lg:py-10 lg:px-8">
             <Image src={aboutPhoto} alt={"about photo"} width="400" height="300" className="object-cover w-full"/>
            </div>
          </div>
          <article className="flex basis-2/4 flex-col justify-evenly gap-4 font-monts text-base text-neutral-700 p-4">
            <h3 className="italic flex flex-col">
              <span>I write about tools. I also write about drinks, and other stuff.</span>
              <span>Hire me if you want someone to do your writing for you.</span>
            </h3>
            <p>
              Hello. I&#39;m a writer. Well, I&#39;m also an educator, adventure
              guide, forum lurker, and sometime dreamweaver as well. I write
              stuff for a living, focusing mainly on cool stuff like power
              tools, gardening equipment, and sometimes even holidays.
            </p>
            <p>
              For fun, I write stuff on here about… tools, and gardening stuff,
              and drinks. I like drinks. I stopped drinking fizzy drinks for a
              long time because they&#39;re terribly non-nutritional, but for
              the sake of writing about something that isn&#39;t a drill or a
              hammer, I leapt thirstily back into the sugar-heavy world of tins
              of pop.
            </p>
            <p>
              I grew up in South London, but moved down to Devon in the late
              twenty-teens when it was all getting a bit too bread-head and it
              wasn&#39;t about the music any more. Exeter&#39;s a great place to
              raise a young family, but there&#39;s not much of a doom metal
              scene. Still, there&#39;s plenty to look at like miniature ponies
              and big rocks covered in moss. Feel free to read any of the
              ramblings I post on here, and if you want to contact me, hit the
              “contact” button up top.
            </p>
          </article>
        </div>
      </div>
    </article>
  );
}
