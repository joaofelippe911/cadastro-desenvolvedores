import { useCallback, useEffect, useState } from "react"
import type { ICreateLevel, ILevel } from "../../interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import LevelService from "../../services/http/LevelService";

export default function useUpdateLevel() {
  const [isLoading, setIsLoading] = useState(true);
  const [level, setLevel] = useState<ILevel | null>(null);

  const params = useParams();

  const navigate = useNavigate();

  const handleSubmit = useCallback(async (data: ICreateLevel) => {
    try {
      await LevelService.update(Number(params.id), data);

      navigate('/niveis');
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadLevel() {
      try {
        setIsLoading(true);
        const data = await LevelService.findById(Number(params.id), controller.signal);

        setLevel(data);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof AxiosError && error.name === "CanceledError") {
          return;
        }

        console.log(error);
      }
    }

    loadLevel();

    return () => {
      controller.abort();
    }
  }, []);

  return {
    handleSubmit,
    level,
    isLoading,
  }
}
