import Header from "@/components/Header";
import Image from "next/image";


export default function Home() {
  return (
    <div>
      <Header />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-start min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
        <main className="flex flex-col gap-0 row-start-2 items-start sm:items-start max-w-md">
          <h1 className="text-xl font-bold text-white mb-4">
            Build an AI Driven Future for Your Business
          </h1>
          <p className="text-l text-white mb-4">
            Bring custom AI practice to any of your business processes, on premises.
          </p>

          <div className="flex gap-4">
            <a
              className="bg-blue-600 text-white rounded-full px-3 py-3 font-semibold hover:bg-blue-700 transition"
              href="#"
            >
              Get it for your business
            </a>
            <a
              className="text-blue-600 border border-blue-600 rounded-full px-3 py-3 font-semibold hover:bg-blue-50 transition"
              href="#"
            >
              Discover more
            </a>
          </div>
        </main>
        <footer className="flex gap-6 row-start-3 items-center justify-center w-full">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
      </div>
    </div>
  );
}
