import { useState, useCallback } from "react";
import axios from "axios";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (configration, processData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios({
        url: configration.url,
        method: configration.method ? configration.method : "GET",
        data: configration.body ? configration.body : null,
      });
      const data = response.data;

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Request failed!");
      }

      processData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  return { sendRequest, isLoading, error };
};

export default useHttp;
