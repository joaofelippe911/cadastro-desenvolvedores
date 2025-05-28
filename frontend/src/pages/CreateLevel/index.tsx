import { LevelForm } from "../../components/LevelForm";
import PageHeader from "../../components/PageHeader";
import useCreateLevel from "./useCreateLevel"

export function CreateLevel() {
  const {
    handleSubmit,
  } = useCreateLevel();

  return (
    <div>
      <PageHeader
        title="Cadastrar nível"
        backTo="/niveis"
      />

      <LevelForm
        onSubmit={handleSubmit}
      />

    </div>
  )
}
