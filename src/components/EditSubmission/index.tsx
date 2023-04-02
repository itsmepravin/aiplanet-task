import styles from "../NewSubmission/NewSubmission.module.scss";
import addPhotoIcon from "../../images/add-photo-alternate.svg";
import calendarIcon from "../../images/calendar-today.svg";
import cloudIcon from "../../images/cloud-upload.svg";
import {
  useState,
  useEffect,
  useCallback,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import { Types } from "../Submission/types";
import { useParams, useNavigate } from "react-router-dom";

interface IEditSubmissionProps {
  data: Types.Submission[];
  setData: Dispatch<SetStateAction<Types.Submission[]>>;
}

const EditSubmission: FC<IEditSubmissionProps> = ({ data, setData }) => {
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

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const currSubmissionData = data.find(
      (element) => element.id === Number(id)
    );
    setTitle(currSubmissionData?.title!);
    setSummary(currSubmissionData?.summary!);
    setDescription(currSubmissionData?.description!);
    setImg(currSubmissionData?.coverImg!);
    setImgName(currSubmissionData?.coverImgName!);
    setHackathonName(currSubmissionData?.hackathonName!);
    setStartDate(currSubmissionData?.startDate!);
    setEndDate(currSubmissionData?.endDate!);
    setGithubLink(currSubmissionData?.githubLink!);
    setGoogleLink(currSubmissionData?.googleLink!);
    console.log("curr", currSubmissionData);
  }, [data, id]);

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

  const editSubmission = (): void => {
    const newData = {
      id: Number(id),
      title,
      summary,
      description,
      favorite: false,
      coverImg: img,
      coverImgName: imgName,
      hackathonName,
      startDate,
      endDate,
      githubLink,
      googleLink,
    };

    const editedSubmissions = data.map((element) =>
      element.id !== Number(id) ? element : newData
    );
    localStorage.setItem("submissions", JSON.stringify(editedSubmissions));
    setData(editedSubmissions);
    navigate("/");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.infoContainer}>
        <span>Edit Hackathon Submission</span>

        <div className={styles.inputContainer}>
          <label>Title</label>
          <input
            value={title}
            type="text"
            placeholder="Title of your submission"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Summary</label>
          <input
            value={summary}
            type="text"
            placeholder="A short summary of your submission (this will be visible with your submission)"
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Description</label>
          <textarea
            value={description}
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
            value={hackathonName}
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
                value={startDate}
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                placeholder="Select Start Date"
                onChange={(e) => console.log(e.target.value)}
              />
              <img src={calendarIcon} alt="" />
            </div>
          </div>

          <div className={styles.dateInputContainer}>
            <label>Hackathon End Date</label>
            <div className={styles.dateInput}>
              <input
                value={endDate}
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
            value={githubLink}
            type="text"
            placeholder="Enter your submission’s public GitHub repository link"
            onChange={(e) => setGithubLink(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Other Links</label>
          <input
            value={googleLink}
            type="text"
            placeholder="You can upload a video demo or URL of you demo app here."
            onChange={(e) => setGoogleLink(e.target.value)}
          />
        </div>

        <div className={styles.divider} />

        <button onClick={editSubmission}>Save Submission</button>
      </div>
    </div>
  );
};

export default EditSubmission;
