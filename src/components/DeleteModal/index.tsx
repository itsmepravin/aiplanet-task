import { Types } from "../Submission/types";
import styles from "./DeleteModal.module.scss";
import React, { FC, Dispatch, SetStateAction } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface IDeleteModalProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  data: Types.Submission[];
  setData: Dispatch<SetStateAction<Types.Submission[]>>;
}

const DeleteModal: FC<IDeleteModalProps> = ({
  modalVisible,
  setModalVisible,
  data,
  setData,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmissionDeletion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const submissionsAfterDeletion = data.filter(
      (element) => element.id !== Number(id)
    );
    setData(submissionsAfterDeletion);
    localStorage.setItem(
      "submissions",
      JSON.stringify(submissionsAfterDeletion)
    );
    setModalVisible(false);
    navigate("/");
  };

  return (
    <div
      className={styles.main}
      style={{ display: !modalVisible ? "none" : "" }}
    >
      <div className={styles.mainContainer}>
        <span>Delete Model</span>
        <span>
          This action is irreversible. Are you sure you want to delete this
          model?
        </span>
        <div className={styles.btnContainer}>
          <button onClick={() => setModalVisible(false)}>Cancel</button>
          <button onClick={handleSubmissionDeletion}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
