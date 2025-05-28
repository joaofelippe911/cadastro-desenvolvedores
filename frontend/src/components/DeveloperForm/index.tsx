import { useState, useEffect } from "react";
import type { ICreateDeveloper, IDeveloper, ILevel } from "../../interfaces";
import "./style.scss";
import LevelService from "../../services/http/LevelService";

interface IProps {
  developer?: IDeveloper;
  onSubmit: (data: ICreateDeveloper) => Promise<void>;
}

export function DeveloperForm({
  onSubmit,
  developer,
}: IProps) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [levels, setLevels] = useState<ILevel[]>([]);
  const [formData, setFormData] = useState({
    nome: developer?.nome || "",
    sexo: developer?.sexo || "M",
    data_nascimento: developer?.data_nascimento || "",
    hobby: developer?.hobby || "",
    nivel_id: developer?.nivel.id || "",
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadLevels() {
      try {
        const levelsList = await LevelService.get(undefined, controller.signal);

        setLevels(levelsList.data);
      } catch(error) {
        console.log(error);
      }
    }

    loadLevels();

    return () => {
      controller.abort();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmiting(true);

    await onSubmit({
      ...formData,
      nivel_id: Number(formData.nivel_id),
    });

    setIsSubmiting(false);
  };

  return (
    <form
      className="developer-form"
      onSubmit={handleSubmit}
    >
      <label>
        Nome:

        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Sexo:

        <select
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
        >
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
      </label>

      <label>
        Data de Nascimento:

        <input
          type="date"
          name="data_nascimento"
          value={formData.data_nascimento}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Hobby:

        <input
          type="text"
          name="hobby"
          value={formData.hobby}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Nível:

        <select
          name="nivel_id"
          value={formData.nivel_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um nível</option>

          {
            levels.map(level => (
              <option
                key={level.id}
                value={level.id}
              >
                {level.nivel}
              </option>
            ))
          }
        </select>
      </label>

      <button
        disabled={isSubmiting}
        type="submit"
      >
        {developer ? "Salvar" : "Cadastrar"}
      </button>
    </form>
  );
}
