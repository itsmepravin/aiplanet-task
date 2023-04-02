import { useParams, useNavigate } from "react-router-dom";
import styles from "./ViewSubmission.module.scss";
import editIcon from "../../images/edit.svg";
import deleteIcon from "../../images/delete.svg";
import githubIcon from "../../images/github.svg";
import openInNewIcon from "../../images/open-in-new.svg";
import calendarIcon from "../../images/calendar-today.svg";
import starIcon from "../../images/star-outline.svg";
import filledStarIcon from "../../images/filled-star.svg";
import React, {
  useEffect,
  useState,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import { Types } from "../Submission/types";
import { DateTypes } from "./types";
import { getDate } from "src/helpers/helpers";
import DeleteModal from "../DeleteModal";

interface IViewSubmissionProps {
  data: Types.Submission[];
  setData: Dispatch<SetStateAction<Types.Submission[]>>;
}

const ViewSubmission: FC<IViewSubmissionProps> = ({ data, setData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currSubmission, setCurrSubmission] = useState<Types.Submission | null>(
    null
  );
  const [submissionStartDate, setSubmissionStartDate] =
    useState<DateTypes.DateType>({
      day: "1",
      month: "January",
      year: "2023",
    });
  const [submissionEndDate, setSubmissionEndDate] =
    useState<DateTypes.DateType>({
      day: "1",
      month: "January",
      year: "2023",
    });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const submission = JSON.parse(
      localStorage.getItem("submissions") as string
    );
    setCurrSubmission(
      submission.find((element: Types.Submission) => element.id === Number(id))
    );

    let startDate = currSubmission?.startDate.split("-");
    let endDate = currSubmission?.endDate.split("-");
    if (startDate !== undefined && endDate !== undefined) {
      const { day, readableMonth, readableYear } = getDate(startDate);
      setSubmissionStartDate({ day, month: readableMonth, year: readableYear });

      const {
        day: endDay,
        readableMonth: endReadableMonth,
        readableYear: endReadableYear,
      } = getDate(endDate);
      setSubmissionEndDate({
        day: endDay,
        month: endReadableMonth,
        year: endReadableYear,
      });
    }
  }, [
    id,
    currSubmission?.startDate,
    currSubmission?.endDate,
    submissionStartDate.day,
    submissionEndDate.day,
    data,
  ]);

  const handleFavorites = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const editedFavoriteSubmissions = data.map((element) =>
      element.id !== Number(id)
        ? element
        : { ...currSubmission, favorite: !currSubmission?.favorite }
    );
    // @ts-ignore
    setData(editedFavoriteSubmissions);
    console.log("data", data);
    localStorage.setItem(
      "submissions",
      JSON.stringify(editedFavoriteSubmissions)
    );
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.heroSection}>
          {/* LEFT HERO SECTION */}
          <div className={styles.leftHeroSection}>
            <div className={styles.topSection}>
              {/* @ts-ignore */}
              <img src={currSubmission!?.coverImg} alt="" />
              <p>{currSubmission!?.title}</p>
            </div>
            <p>{currSubmission!?.summary}</p>
            <div className={styles.bottomSection}>
              <img
                src={currSubmission?.favorite ? filledStarIcon : starIcon}
                alt=""
                onClick={handleFavorites}
              />
              <div className={styles.dateContainer}>
                <img src={calendarIcon} alt="" />
                {submissionStartDate.day} {submissionStartDate.month}
              </div>
            </div>
          </div>

          {/* RIGHT HERO SECTION */}
          <div className={styles.rightHeroSection}>
            <div
              className={styles.button}
              onClick={() => navigate(`/edit/${id}`)}
            >
              <img src={editIcon} alt="" />
              Edit
            </div>
            <div
              className={styles.button}
              onClick={() => setModalVisible(true)}
            >
              <img src={deleteIcon} alt="" />
              Delete
            </div>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className={styles.detailsSection}>
          {/* LEFT DETAILS SECTION */}
          <div className={styles.leftDetailsSection}>
            <span>Description</span>
            <p>{currSubmission!?.description}</p>
          </div>

          {/* RIGHT DETAILS SECTION */}
          <div className={styles.rightDetailsSection}>
            <span>Hackathon</span>
            <span>{currSubmission!?.hackathonName}</span>
            <div className={styles.dateYearContainer}>
              <img src={calendarIcon} alt="" />
              {submissionStartDate?.day} {submissionStartDate?.month}{" "}
              {submissionStartDate?.year} - {submissionEndDate?.day}{" "}
              {submissionEndDate?.month} {submissionEndDate?.year}
            </div>
            <div className={styles.linkButton}>
              <img src={githubIcon} alt="" />
              Github Repository
            </div>
            <div className={styles.linkButton}>
              <img src={openInNewIcon} alt="" />
              Other Link
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={data}
        setData={setData}
      />
    </>
  );
};

export default ViewSubmission;
