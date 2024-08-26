import Image from "next/image";
import Wallet from "./components/Wallet";

export default function Home() {
  return (
    <main className=" min-h-screen  p-24 text-center ">
       <Wallet/>
       <p className="text-red-300">-------- 2</p>
    </main>
  );
}
