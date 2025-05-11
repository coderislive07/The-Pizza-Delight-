import Image from "next/image";
import HeroSection from "./components/heroSection";
import BakedBreadsMenu from "./components/BakedBreads.jsx";
import BakedPastaMenu from "./components/BakedPasta.jsx";
import SidesMenu from "./components/Sides.jsx";
import IceCreamsMenu from "./components/IceCream.jsx";
import MilkshakesMenu from "./components/MilkShake.jsx";
import CreativeDelightsMenu from "./components/CreativePizza.jsx";
import PizzaPockets from "./components/PizzaPockets";
import PizzaCones from "./components/PizzaCones";
import TopPicks from "./components/TopPicks";
import BasicDelight from "./components/BasicDelight";
import DeluxeDelight from "./components/DeluxeDelight";
import logo from "../../public/logo.png";


export default function Home() {
  return (

      <main>
        <HeroSection></HeroSection>
        <TopPicks/>
        <BasicDelight/>
        <DeluxeDelight/>
          <CreativeDelightsMenu/>
          <PizzaCones/>
          <PizzaPockets/>
      <BakedBreadsMenu/> 
        <SidesMenu/>
               <BakedPastaMenu/>
             <MilkshakesMenu/>
          <IceCreamsMenu/>


      </main>
  );
}
