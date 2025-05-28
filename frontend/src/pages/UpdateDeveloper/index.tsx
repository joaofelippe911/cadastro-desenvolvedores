import { DeveloperForm } from "../../components/DeveloperForm";
import PageHeader from "../../components/PageHeader";
import useUpdateDeveloper from "./useUpdateDeveloper"

export function UpdateDeveloper() {
  const {
    handleSubmit,
    developer,
    isLoading,
  } = useUpdateDeveloper();

  return (
    <div>
      <PageHeader
        title="Editar desenvolvedor"
        backTo="/"
      />

      {
        !isLoading && developer && (
          <DeveloperForm
            developer={developer}
            onSubmit={handleSubmit}
          />
        )
      }
    </div>
  )
}
