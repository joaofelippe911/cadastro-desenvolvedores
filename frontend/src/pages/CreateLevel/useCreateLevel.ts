import { useCallback } from "react"
import type { ICreateLevel } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import LevelService from "../../services/http/LevelService";

export default function useCreateLevel() {

  const navigate = useNavigate();

  const handleSubmit = useCallback(async (data: ICreateLevel) => {
    try {
      await LevelService.create(data);

      navigate('/niveis');
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    handleSubmit
  }
}
