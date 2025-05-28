import { useState } from "react";
import type { ICreateLevel, ILevel } from "../../interfaces";
import "./style.scss";

interface IProps {
  level?: ILevel;
  onSubmit: (data: ICreateLevel) => Promise<void>;
}

export function LevelForm({
  onSubmit,
  level,
}: IProps) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [formData, setFormData] = useState({
    nivel: level?.nivel || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmiting(true);

    await onSubmit({
      ...formData,
    });

    setIsSubmiting(false);
  };

  return (
    <form
      className="level-form"
      onSubmit={handleSubmit}
    >
      <label>
        Nível:

        <input
          type="text"
          name="nivel"
          value={formData.nivel}
          onChange={handleChange}
          required
        />
      </label>

      <button
        disabled={isSubmiting}
        type="submit"
      >
        {level ? "Salvar" : "Cadastrar"}
      </button>
    </form>
  );
}
