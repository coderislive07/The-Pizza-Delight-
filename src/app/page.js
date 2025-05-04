import Image from "next/image";
import HeroSection from "./components/heroSection";
import BakedBreadsMenu from "./components/BakedBreads.jsx";
import BakedPastaMenu from "./components/BakedPasta.jsx";
import SidesMenu from "./components/Sides.jsx";
import IceCreamsMenu from "./components/IceCream.jsx";
import MilkshakesMenu from "./components/MilkShake.jsx";
import logo from "../../public/logo.png";

export default function Home() {
  return (

      <main>
        <HeroSection></HeroSection>
      <BakedBreadsMenu/>
      <MilkshakesMenu/>

        <BakedPastaMenu/>
        <SidesMenu/>
          <IceCreamsMenu/>


      </main>
  );
}
