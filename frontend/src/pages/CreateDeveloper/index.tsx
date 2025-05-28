import { DeveloperForm } from "../../components/DeveloperForm";
import PageHeader from "../../components/PageHeader";
import useCreateDeveloper from "./useCreateDeveloper"

export function CreateDeveloper() {
  const {
    handleSubmit,
  } = useCreateDeveloper();

  return (
    <div>
      <PageHeader
        title="Cadastrar desenvolvedor"
        backTo="/"
      />

      <DeveloperForm
        onSubmit={handleSubmit}
      />

    </div>
  )
}
