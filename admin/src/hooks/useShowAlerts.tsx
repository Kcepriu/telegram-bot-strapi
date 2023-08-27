import React, { useState, FC } from "react";
import { Alert } from "@strapi/design-system";
import { v4 as uuidv4 } from "uuid";

interface IAlarm {
  id: string;
  text: string;
  type: TypeAlarm;
}

export enum TypeAlarm {
  default = "default",
  success = "success",
  danger = "danger",
  warning = "warning",
}

interface IParamAddAlarm {
  text: string;
  type: TypeAlarm;
}

export const useShowAlerts = () => {
  const [listAlarms, setListAlarms] = useState<IAlarm[]>([]);

  const handleCloseAlert = (id: string) => {
    setListAlarms((prev) => prev.filter((ararm) => ararm.id !== id));
  };

  const handleAddAlarm = ({
    type = TypeAlarm.default,
    text,
  }: IParamAddAlarm) => {
    setListAlarms((prev) => [
      ...prev,
      {
        type,
        text,
        id: uuidv4(),
      },
    ]);
  };

  const Alerts: FC = () =>
    listAlarms.length === 0 ? (
      <></>
    ) : (
      <>
        {listAlarms.map((alert) => (
          <Alert
            key={alert.id}
            closeLabel="Close alert"
            title="Title"
            variant={alert.type}
            onClose={() => handleCloseAlert(alert.id)}
          >
            {alert.text}
          </Alert>
        ))}
      </>
    );

  return { Alerts, handleAddAlarm };
};
