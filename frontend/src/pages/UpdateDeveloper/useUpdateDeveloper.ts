import { useCallback, useEffect, useState } from "react"
import DeveloperService from "../../services/http/DeveloperService";
import type { ICreateDeveloper, IDeveloper } from "../../interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

export default function useUpdateDeveloper() {
  const [isLoading, setIsLoading] = useState(true);
  const [developer, setDeveloper] = useState<IDeveloper | null>(null);

  const params = useParams();

  const navigate = useNavigate();

  const handleSubmit = useCallback(async (data: ICreateDeveloper) => {
    try {
      await DeveloperService.update(Number(params.id), data);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDeveloper() {
      try {
        setIsLoading(true);
        const data = await DeveloperService.findById(Number(params.id), controller.signal);

        setDeveloper(data);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof AxiosError && error.name === "CanceledError") {
          return;
        }

        console.log(error);
      }
    }

    loadDeveloper();

    return () => {
      controller.abort();
    }
  }, []);

  return {
    handleSubmit,
    developer,
    isLoading,
  }
}
