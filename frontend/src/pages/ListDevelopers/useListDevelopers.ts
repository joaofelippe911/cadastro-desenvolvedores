import { useCallback, useEffect, useRef, useState } from "react"
import DeveloperService from "../../services/http/DeveloperService";
import type { PaginatedList } from "../../types";
import type { IDeveloper } from "../../interfaces";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function useListDevelopers() {
  const [isLoading, setIsLoading] = useState(true);
  const [developersList, setDevelopersList] = useState<PaginatedList<IDeveloper> | null>(null);

  const navigate = useNavigate();

  const abortControllerRef = useRef<AbortController>(null);

  const handleDeleteDeveloper = useCallback(async (id: number) => {
    try {
      await DeveloperService.delete(id);

      setDevelopersList((prevState) => {
        if (!prevState) {
          return null;
        }

        return {
          ...prevState,
          data: prevState?.data.filter((e) => e.id !== id),
        }
      })
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleEditDeveloper = useCallback((id: number) => {
    navigate(`/editar/${id}`);
  }, []);

  const loadData = useCallback(async (page = 1) => {
    try {
      setIsLoading(true);
      const data = await DeveloperService.get(page, abortControllerRef.current?.signal);

      setDevelopersList(data);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError && error.name === "CanceledError") {
        return;
      }

      console.log(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    abortControllerRef.current = new AbortController();

    loadData();

    return () => {
      abortControllerRef.current?.abort();
    }
  }, []);

  return {
    isLoading,
    developersList,
    handleDeleteDeveloper,
    handleEditDeveloper,
    loadData,
  }
}
