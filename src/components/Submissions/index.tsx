import { FC, useState, Dispatch, SetStateAction, useCallback } from "react";
import styles from "./Submissions.module.scss";
import searchIcon from "../../images/search.svg";
import chevronIcon from "../../images/arrow-drop-down.svg";
import { Types } from "../Submission/types";

interface ISubmissionsProps {
  data: Types.Submission[];
  setData: Dispatch<SetStateAction<Types.Submission[]>>;
}

const Submissions: FC<ISubmissionsProps> = ({ data, setData }) => {
  const [currSection, setCurrSection] = useState("all");
  const [sortBy, setSortBy] = useState("Newest");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const selectAllSubmissions = useCallback(() => {
    setCurrSection("all");
    setData(JSON.parse(localStorage.getItem("submissions") as string));
  }, [setData]);

  const selectFavoriteSubmissions = useCallback(() => {
    setCurrSection("favourite");
    const filteredData = data.filter((element) => element.favorite);
    setData(filteredData);
  }, [data, setData]);

  const handleSorting = useCallback(
    (value: string) => {
      setSortBy(value);
      setModalVisible(false);
      if (value === "Newest") {
        const sortedSubmissions = data.sort(
          //@ts-ignore
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
        setData(sortedSubmissions);
        console.log(data);
      } else if (value === "Oldest") {
        const sortedSubmissionss = data.sort(
          //@ts-ignore
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
        setData(sortedSubmissionss);
        console.log(data);
      }
    },
    [data, setData]
  );

  const filterBySearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
      const filteredData = data.filter((element) =>
        element.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setData(filteredData);
    },
    [data, searchText, setSearchText, setData]
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <span
          className={
            currSection === "all"
              ? styles.activeSection
              : styles.inactiveSection
          }
          onClick={selectAllSubmissions}
        >
          All Submissions
        </span>
        <span
          className={
            currSection === "favourite"
              ? styles.activeSection
              : styles.inactiveSection
          }
          onClick={selectFavoriteSubmissions}
        >
          Favourite Submissions
        </span>
      </div>
      <div className={styles.rightContainer}>
        <span>
          <img src={searchIcon} width={17} height={17} alt="Search Icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={filterBySearch}
          />
        </span>
        <span onClick={() => setModalVisible(!modalVisible)}>
          <span>{sortBy}</span>
          <img src={chevronIcon} width={24} height={24} alt="Chevron Icon" />
          <div
            className={styles.sortModal}
            style={{ display: !modalVisible ? "none" : "" }}
          >
            <span
              style={{
                backgroundColor:
                  sortBy === "Newest"
                    ? "var(--celestial-green-2)"
                    : "var(--white)",
              }}
              onClick={() => handleSorting("Newest")}
            >
              Newest
            </span>
            <span
              style={{
                backgroundColor:
                  sortBy === "Oldest"
                    ? "var(--celestial-green-2)"
                    : "var(--white)",
              }}
              onClick={() => handleSorting("Oldest")}
            >
              Oldest
            </span>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Submissions;
