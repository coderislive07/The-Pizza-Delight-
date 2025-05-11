import Image from "next/image";
import HeroSection from "./components/heroSection";
import BakedBreadsMenu from "./components/BakedBreads.jsx";
import BakedPastaMenu from "./components/BakedPasta.jsx";
import SidesMenu from "./components/Sides.jsx";
import IceCreamsMenu from "./components/IceCream.jsx";
import MilkshakesMenu from "./components/MilkShake.jsx";
import CreativeDelightsMenu from "./components/CreativePizza.jsx";
import PizzaPockets from "./components/PizzaPockets";
import logo from "../../public/logo.png";

export default function Home() {
  return (

      <main>
        <HeroSection></HeroSection>
          <CreativeDelightsMenu/>
          <PizzaPockets/>
      <BakedBreadsMenu/> 
        <SidesMenu/>
               <BakedPastaMenu/>
             <MilkshakesMenu/>
          <IceCreamsMenu/>


      </main>
  );
}
