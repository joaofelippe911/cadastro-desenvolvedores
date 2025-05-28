import PageHeader from "../../components/PageHeader";
import { Table } from "../../components/Table";
import useListLevels from "./useListLevels"

export function ListLevels() {
  const {
    levelsList,
    isLoading,
    handleDeleteLevel,
    handleEditLevel,
    loadData,
  } = useListLevels();

  return (
    <div>
      <PageHeader
        title="Listagem de Níveis"
        buttonText="Novo nível"
        buttonTo="/niveis/cadastrar"
      />

          <Table
            isLoading={isLoading}
            data={levelsList?.data}
            meta={levelsList?.meta}
            columns={[
              {
                data_index: "nivel",
                title: "Nível"
              },
              {
                data_index: "quantidade_devs_associados",
                title: "Qtd. Devs Associados"
              },
            ]}
            onDelete={handleDeleteLevel}
            onEdit={handleEditLevel}
            onPageChange={loadData}
          />
    </div>
  )
}
