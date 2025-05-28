import { useCallback } from "react"
import DeveloperService from "../../services/http/DeveloperService";
import type { ICreateDeveloper } from "../../interfaces";
import { useNavigate } from "react-router-dom";

export default function useCreateDeveloper() {

  const navigate = useNavigate();

  const handleSubmit = useCallback(async (data: ICreateDeveloper) => {
    try {
      await DeveloperService.create(data);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    handleSubmit
  }
}
