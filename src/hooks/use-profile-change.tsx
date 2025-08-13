import { useState } from "react";
import toast from "react-hot-toast";
import { AdminFormValuesType } from "../schema/pc/profile";

export const useProfileChange = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [isEditablePc, setIsEditablePc] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: AdminFormValuesType) => {
    try {
      setLoading(true);
      setIsEditable(false);
      console.log(data);
    } catch (error: any) {
      if (error.message === "Network error: Unable to connect to the server.") {
        toast.error("Network error: Unable to connect to the server");
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmitPc = async () => {
    try {
      setLoading(true);
      setIsEditablePc(false);
    } catch (error: any) {
      if (error.message === "Network error: Unable to connect to the server.") {
        toast.error("Network error: Unable to connect to the server");
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    isEditable,
    isEditablePc,
    setIsEditable,
    setIsEditablePc,
    onSubmit,
    onSubmitPc,
  };
};
