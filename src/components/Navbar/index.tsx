import aiPlanetLogo from "../../images/AI Planet Logo.png";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.mainContainer}>
      <img src={aiPlanetLogo} alt="AI Planet Logo" />
    </div>
  );
};

export default Navbar;
