import styles from "./HeroButton.module.scss";
import { useNavigate } from "react-router-dom";

const HeroButton = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.mainContainer} onClick={() => navigate("/add")}>
      <span>Upload Submission</span>
    </div>
  );
};

export default HeroButton;
