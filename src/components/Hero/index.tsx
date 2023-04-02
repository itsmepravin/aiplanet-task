import handHolding from "../../images/Hand holding bulb 3D.png";
import HeroButton from "../HeroButton";
import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <div className={styles.mainContainer}>
      {/* HERO LEFT SECTION */}
      <div className={styles.leftContainer}>
        <p>Hackathon Submissions</p>
        <p>
          Lorem ipsum dolor sit amet consectetur. Urna cursus amet pellentesque
          in parturient purus feugiat faucibus. Congue laoreet duis porta turpis
          eget suspendisse ac pharetra amet. Vel nisl tempus nec vitae.{" "}
        </p>
        <HeroButton />
      </div>

      {/* HERO RIGHT SECTION */}
      <img className={styles.heroImage} src={handHolding} alt="Hand Holding" />
    </div>
  );
};

export default Hero;
