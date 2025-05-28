import PageHeader from "../../components/PageHeader";
import { Table } from "../../components/Table";
import { formatDate } from "../../utils";
import useListDevelopers from "./useListDevelopers"

export function ListDevelopers() {
  const {
    developersList,
    isLoading,
    handleDeleteDeveloper,
    handleEditDeveloper,
    loadData,
  } = useListDevelopers();

  return (
    <div>
      <PageHeader
        title="Listagem de Desenvolvedores"
        buttonText="Novo desenvolvedor"
        buttonTo="/cadastrar"
      />

          <Table
            isLoading={isLoading}
            data={developersList?.data}
            meta={developersList?.meta}
            columns={[
              {
                data_index: "nome",
                title: "Nome"
              },
              {
                data_index: "sexo",
                title: "Sexo"
              },
              {
                data_index: "data_nascimento",
                title: "Data nascimento",
                render: (value) => formatDate(value),
              },
              {
                data_index: "idade",
                title: "Idade",
              },
              {
                data_index: "hobby",
                title: "Hobby",
              },
              {
                data_index: "nivel",
                title: "Nível",
                render: (value) => value?.nivel ?? "-"
              },
            ]}
            onDelete={handleDeleteDeveloper}
            onEdit={handleEditDeveloper}
            onPageChange={loadData}
          />
    </div>
  )
}
