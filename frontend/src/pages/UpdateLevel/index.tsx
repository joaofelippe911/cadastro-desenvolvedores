import { LevelForm } from "../../components/LevelForm";
import PageHeader from "../../components/PageHeader";
import useUpdateLevel from "./useUpdateLevel"

export function UpdateLevel() {
  const {
    handleSubmit,
    level,
    isLoading,
  } = useUpdateLevel();

  return (
    <div>
      <PageHeader
        title="Editar nível"
        backTo="/niveis"
      />

      {
        !isLoading && level && (
          <LevelForm
            level={level}
            onSubmit={handleSubmit}
          />
        )
      }
    </div>
  )
}
