import styles from "./Submission.module.scss";
import { FC } from "react";
import { Types } from "./types";
import { useNavigate } from "react-router-dom";
import { handleDaysAgo } from "src/helpers/helpers";

interface ISubmissionProps {
  submission: Types.Submission;
}

const Submission: FC<ISubmissionProps> = ({ submission }) => {
  const navigate = useNavigate();

  const daysAgo = handleDaysAgo(submission.startDate);

  return (
    <div
      className={styles.mainContainer}
      onClick={() => navigate(`/view/${submission.id}`)}
    >
      <div className={styles.titleContainer}>
        {/* @ts-ignore */}
        <img src={submission.coverImg} alt={submission.title} />
        <span>{submission.title}</span>
      </div>
      <div className={styles.descriptionContainer}>{submission.summary}</div>
      <div className={styles.dateContainer}>
        uploaded {daysAgo} day{daysAgo > 1 && "s"} ago
      </div>
    </div>
  );
};

export default Submission;
