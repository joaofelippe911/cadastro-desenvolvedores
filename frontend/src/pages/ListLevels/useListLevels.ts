import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import type { ILevel } from "../../interfaces";
import type { PaginatedList } from "../../types";

import LevelService from "../../services/http/LevelService";

export default function useListLevels() {
  const [isLoading, setIsLoading] = useState(true);
  const [levelsList, setLevelsList] = useState<PaginatedList<ILevel> | null>(null);

  const navigate = useNavigate();

  const abortControllerRef = useRef<AbortController>(null);

  const handleDeleteLevel = useCallback(async (id: number) => {
    try {
      await LevelService.delete(id);

      setLevelsList((prevState) => {
        if (!prevState) {
          return null;
        }

        return {
          ...prevState,
          data: prevState?.data.filter((e) => e.id !== id),
        }
      })
    } catch (error: any) {
      alert(error?.response.data.message)
    }
  }, []);

  const handleEditLevel = useCallback((id: number) => {
    navigate(`/niveis/editar/${id}`);
  }, []);

  const loadData = useCallback(async (page = 1) => {
    try {
      setIsLoading(true);
      const data = await LevelService.get(page, abortControllerRef.current?.signal);

      setLevelsList(data);
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
    levelsList,
    handleDeleteLevel,
    handleEditLevel,
    loadData,
  }
}
