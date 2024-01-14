/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"
import { useForm, type SubmitHandler } from "react-hook-form"

export type Inputs = {
  email: string
  subject: string
  message: string
}
const ContactForm = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    reset()
  }
  return (
    <>
      <section className="z-0 mx-60 flex border-2 border-[#CFE1FF] w-4/5 lg:w-3/5 bg-white">
        <div className="mx-auto max-w-screen-md py-8 px-4 lg:py-16 font-monts">
          <h2 className="mb-4 text-center text-4xl font-semibold tracking-tight text-gray-700">
            Get In Touch
          </h2>
          <p className="mb-6 text-center font-light text-gray-500 sm:text-xl">
          Contact me at <a className="text-blue-400" href="mailto:harry@harryduncton.com">harry@harryduncton.com</a> or via the form below 
          </p>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                Your email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Please enter an email"
                })}
                className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
                placeholder="name@example.com"

              />
              <p className="text-red-400 mt-2">{errors.email?.message}</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 ">
                Subject
              </label>
              <input
                type="text"
                {...register("subject", {
                  required: "Please fill in"
                })}
                className="focus:ring-primary-500 focus:border-primary-500  block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm"
                placeholder="Let us know how we can help you"

              />
              <p className="text-red-400 mt-2">{errors.subject?.message}</p>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-900 ">
                Your message
              </label>
              <textarea
                rows={6}
                {...register("message", {
                  required: "Please enter your message"
                })}
                className="focus:ring-primary-500 focus:border-primary-500   block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
                placeholder="Leave a comment..."
              ></textarea>
              <p className="text-red-400 mt-2">{errors.message?.message}</p>
            </div>
            <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#052962] hover:bg-[#067A75] focus:ring-primary-300 rounded-lg py-3 px-5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 sm:w-fit"
            >
              Send message
            </button>
            </div>
           
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
