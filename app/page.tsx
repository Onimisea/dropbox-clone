import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="">
      <section className="flex flex-col lg:flex-row justify-center items-center bg-[#2b2929] dark:bg-slate-800 text-white py-24 px-10 gap-16">
        <section className="w-full">
          <h1 className="font-bold text-5xl">Welcome to Dropbox</h1>
          <p className="text-3xl font-bold mt-8">
            Storing everything for you and your business needs. All in one
            place.
          </p>
          <p className="mt-4 text-justify">
            Enhance your personal storage with Dropbox, offering a simple and
            efficient way to upload, organize and access files from anywhere.
            Securely store important documents and media, and experience the
            convenience of easy file management and sharing in one centralized
            solution.
          </p>

          <Link
            href="/dashboard"
            className="flex items-center justify-start mt-8 bg-[#0160fe] w-fit px-5 py-4 cursor-pointer rounded-md"
          >
            Try it for free! <ArrowRight className="ml-3" />
          </Link>
        </section>

        <section className="w-full bg-[#1e1919] dark:bg-transparent h-full p-10 rounded-md">
          <video autoPlay muted loop className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag
          </video>
        </section>
      </section>

      <section className="w-full text-center p-10 mt-5">
        <h4 className="text-red-600 dark:text-red-700 font-bold text-xl mb-3">
          Disclaimer
        </h4>
        <p className="text-slate-600 dark:text-slate-300 text-md">
          This project is made for demonstration purposes only. I do not own or
          affiliate with Dropbox or/and any of its subsidiaries in any form.
        </p>
      </section>
    </main>
  );
}
