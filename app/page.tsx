import Image from "next/image";
import { WavyBackground } from "@/components/ui/background";
import Newsletter from "@/components/ui/Newsletter";

export default function Home() {
  return (
    <>
      <main className="h-screen w-screen">
        <WavyBackground>
          <div className="h-screen w-screen text-center flex justify-center align-middle items-center">
            <Newsletter />
          </div>
        </WavyBackground>
      </main>
    </>
  );
}
