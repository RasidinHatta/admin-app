import Header from "@/components/Header";
import Spline from "@splinetool/react-spline";


export default function Home() {
  return (
    <div className="absolute top-0 w-full h-full overflow-hidden">
      <Header />
      <Spline
        scene="https://prod.spline.design/49emFDQBYgVsHDDp/scene.splinecode"
        className="absolute top-0 left-0 w-full h-full border-none -z-10"
      />
      <Spline
        scene="https://prod.spline.design/kDc8Kz5VaDMPBW2c/scene.splinecode"
        className="absolute top-25 left-0 w-full h-full border-none"
      />
    </div>
  );
}
