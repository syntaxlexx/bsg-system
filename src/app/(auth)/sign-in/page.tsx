import Link from "next/link";
import AuthForm from "./auth-form";

interface Props {}

const Page = async ({}: Props) => {
  return (
    <section className="w-full bg-white">
      <div className="container">
        <div className="flex flex-col lg:flex-row">
          <div className="relative w-full bg-cover lg:w-6/12 xl:w-7/12 bg-gradient-to-r from-white via-white to-gray-100">
            <div className="relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0">
              <div className="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
                <div className="relative">
                  <p className="mb-2 font-medium text-gray-700 uppercase">
                    Work smarter
                  </p>
                  <h2 className="text-5xl font-bold text-gray-900 xl:text-6xl">
                    Get Your Grades <br />
                    The Smart Way
                  </h2>
                </div>
                <p className="text-2xl text-gray-700">
                  Don&apos;t hesitate contacting us for a quick walk-through of
                  your current project.
                </p>
                {/* <a
                  href="#_"
                  className="inline-block px-8 py-5 text-xl font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
                  data-primary="blue-600"
                  data-rounded="rounded-lg"
                >
                  Get Started Today
                </a> */}
              </div>
            </div>
          </div>

          <div className="w-full bg-white lg:w-6/12 xl:w-5/12">
            <div className="flex flex-col items-start justify-start w-full h-full p-10 lg:p-16 xl:p-24">
              <h4 className="w-full text-3xl font-bold">Signup</h4>
              <p className="text-lg text-gray-500">
                or, if you dont have an account you can{" "}
                <Link
                  href="/sign-up"
                  className="text-blue-600 underline"
                  data-primary="blue-600"
                >
                  sign up
                </Link>
              </p>

              <div className="mt-10">
                <AuthForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
