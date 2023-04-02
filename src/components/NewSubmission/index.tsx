import styles from "./NewSubmission.module.scss";
import addPhotoIcon from "../../images/add-photo-alternate.svg";
import calendarIcon from "../../images/calendar-today.svg";
import cloudIcon from "../../images/cloud-upload.svg";
import { useState, useCallback, FC, Dispatch, SetStateAction } from "react";
import { Types } from "../Submission/types";
import { useNavigate } from "react-router-dom";

interface INewSubmissionProps {
  setData: Dispatch<SetStateAction<Types.Submission[]>>;
}

const NewSubmission: FC<INewSubmissionProps> = ({ setData }) => {
  const navigate = useNavigate();

  const [img, setImg] = useState<string | ArrayBuffer>("");
  const [imgName, setImgName] = useState("");

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [hackathonName, setHackathonName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [googleLink, setGoogleLink] = useState("");

  const handleImageUpload = async (file: File) => {
    setImgName(file.name);
    return await new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();
      reader.onload = (e) => resolve(setImg(reader.result!));
      reader.onerror = (e: ProgressEvent<FileReader>) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  const clearImageSelection = useCallback(() => {
    setImg("");
    setImgName("");
  }, []);

  const addNewSubmission = (): void => {
    const newData = {
      id: Math.floor(Math.random() * 100),
      title,
      summary,
      description,
      favorite: false,
      coverImg: img,
      hackathonName,
      startDate,
      endDate,
      githubLink,
      googleLink,
    };
    const prevData = JSON.parse(localStorage.getItem("submissions") as string);
    localStorage.setItem("submissions", JSON.stringify([...prevData, newData]));
    setData([...prevData, newData]);
    navigate("/");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.infoContainer}>
        <span>New Hackathon Submission</span>

        <div className={styles.inputContainer}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title of your submission"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Summary</label>
          <input
            type="text"
            placeholder="A short summary of your submission (this will be visible with your submission)"
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Description</label>
          <textarea
            className={styles.description}
            placeholder="Write a long description of your project. You can describe your idea and approach here."
            rows={10}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={3000}
          />
          <span
            style={{
              textAlign: "end",
              width: "93%",
              color: "var(--celestial-grey-4)",
            }}
          >
            {description.length} / 3,000 characters
          </span>
        </div>

        <div className={styles.inputContainer}>
          <span>Cover Image</span>
          <span>Minimum resolution: 360px X 360px</span>
          {imgName === "" ? (
            <label htmlFor="images" className={styles.dropContainer}>
              <span className={styles.dropTitle}>
                <img src={addPhotoIcon} alt="" />
              </span>
              <input
                type="file"
                id="images"
                accept="image/*"
                required
                onChange={(e) => handleImageUpload(e.target.files![0])}
              />
            </label>
          ) : (
            <label className={styles.completedDropContainer}>
              <div className={styles.leftImageContainer}>
                {/* @ts-ignore */}
                <img src={img} alt="" width={48} height={48} />
                <span>{imgName}</span>
              </div>
              <div
                className={styles.rightImageContainer}
                onClick={clearImageSelection}
              >
                <span>Reupload</span>
                <img src={cloudIcon} alt="" />
              </div>
            </label>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label>Hackathon Name</label>
          <input
            type="text"
            placeholder="Enter the name of the hackathon"
            onChange={(e) => setHackathonName(e.target.value)}
          />
        </div>

        <div className={styles.hackathonContainer}>
          <div className={styles.dateInputContainer}>
            <label>Hackathon Start Date</label>
            <div className={styles.dateInput}>
              <input
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                placeholder="Select Start Date"
                onChange={(e) => setStartDate(e.target.value)}
              />
              <img src={calendarIcon} alt="" />
            </div>
          </div>

          <div className={styles.dateInputContainer}>
            <label>Hackathon End Date</label>
            <div className={styles.dateInput}>
              <input
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                placeholder="Select End Date"
                onChange={(e) => setEndDate(e.target.value)}
              />
              <img src={calendarIcon} alt="" />
            </div>
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label>Github Repository</label>
          <input
            type="text"
            placeholder="Enter your submission’s public GitHub repository link"
            onChange={(e) => setGithubLink(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Other Links</label>
          <input
            type="text"
            placeholder="You can upload a video demo or URL of you demo app here."
            onChange={(e) => setGoogleLink(e.target.value)}
          />
        </div>

        <div className={styles.divider} />

        <button onClick={addNewSubmission}>Upload Submission</button>
      </div>
    </div>
  );
};

export default NewSubmission;
