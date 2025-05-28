import { useCallback, useState } from 'react';
import './style.scss';
import Modal from '../Modal';
import type { IListMetaData } from '../../interfaces';

type DataType = { id: number, [key: string]: any };

interface IProps<T extends DataType> {
  data: T[] | undefined;
  meta: IListMetaData | undefined;
  columns: {
    data_index: keyof T;
    title: string;
    render?: (value: any, record: T) => React.ReactNode;
  }[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number) => void;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function Table<T extends DataType>({
  data,
  meta,
  columns,
  onDelete,
  onEdit,
  onPageChange,
  isLoading = false,
}: IProps<T>) {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [dataBeingDeleted, setDataBeingDeleted] = useState<T | null>(null);

  const handleClickDelete = useCallback((id: number) => {
    const clickedItem = data?.find((e) => e.id === id);

    if (!clickedItem) {
      return;
    }

    setDataBeingDeleted(clickedItem);
    setIsDeleteModalVisible(true);
  }, [data]);

  const handleCancelDelete = useCallback(() => {
    setDataBeingDeleted(null);
    setIsDeleteModalVisible(false);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!dataBeingDeleted) {
      return;
    }

    setIsLoadingDelete(true);

    await onDelete(dataBeingDeleted.id);

    setIsLoadingDelete(false);
    setDataBeingDeleted(null);
    setIsDeleteModalVisible(false);
  }, [dataBeingDeleted]);

  const totalPages = meta?.last_page || 1;

  return (
    <>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {
                columns.map((col) => (
                  <th key={col.data_index as string}>
                    {col.title}
                  </th>
                ))
              }

              <th>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {
                  columns.map((col) => (
                    <td key={col.data_index as string}>
                      {
                        col.render
                          ? col.render(row[col.data_index], row)
                          : (row[col.data_index] as React.ReactNode)
                      }
                    </td>
                  ))
                }

                <td>
                  <div className='actions-container'>
                    <button
                      onClick={() => onEdit(row.id)}
                      className='edit-button'
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleClickDelete(row.id)}
                      className='delete-button'
                    >
                      Deletar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {
          isLoading && (
            <span>Carregando...</span>
          )
        }

        {
          meta && (
            <div className="pagination-container">
              <button
                disabled={meta.current_page <= 1}
                onClick={() => onPageChange(meta.current_page - 1)}
              >
                Anterior
              </button>
              <span>Página {meta.current_page} de {totalPages}</span>
              <button
                disabled={meta.current_page >= totalPages}
                onClick={() => onPageChange(meta.current_page + 1)}
              >
                Próxima
              </button>
            </div>
          )
        }
      </div>

      <Modal
        visible={isDeleteModalVisible}
        isLoading={isLoadingDelete}
        title={`Tem certeza que deseja deletar o item "${dataBeingDeleted?.[columns[0]?.data_index]}"?`}
        confirmLabel="Deletar"
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>
    </>
  )
}
