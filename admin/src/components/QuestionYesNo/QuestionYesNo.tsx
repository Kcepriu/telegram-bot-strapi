import React, { FC, Dispatch, SetStateAction } from "react";

import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
} from "@strapi/design-system";

interface IProps {
  title: string;
  question: string;
  labelCancel?: string;
  labelOk?: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  handleOk: () => void;
}

const QuestionYesNo: FC<IProps> = ({
  title,
  question,
  labelCancel = "Cancel",
  labelOk = "OK",
  setShowModal,
  handleOk,
}) => {
  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    handleOk();
    closeModal();
  };

  return (
    <ModalLayout
      onClose={closeModal}
      labelledBy="title"
      as="form"
      onSubmit={handleSubmit}
      width={`${480 / 16}rem`}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {title}
        </Typography>
      </ModalHeader>

      <ModalBody>
        <Typography
          fontWeight="bold"
          textColor="neutral800"
          as="h4"
          id="question"
        >
          {question}
        </Typography>
      </ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={closeModal} variant="tertiary">
            {labelCancel}
          </Button>
        }
        endActions={<Button type="submit">{labelOk}</Button>}
      />
    </ModalLayout>
  );
};

export default QuestionYesNo;
