import Header from "@/components/Header";


export default function Home() {
  return (
    <div>
      <Header />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
        <h5 className="font-bold mt-10">Home Page</h5>
      </div>
    </div>
  );
}
