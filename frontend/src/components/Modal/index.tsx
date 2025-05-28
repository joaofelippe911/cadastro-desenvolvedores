
import ReactPortal from '../ReactPortal';
import type { ReactNode } from 'react';

import './style.scss'

interface IProps {
  title: string;
  children: ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
  visible: boolean;
  isLoading?: boolean;
}

export default function Modal({
  title,
  children,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  onCancel,
  onConfirm,
  visible,
  isLoading = false,
}: IProps) {
  if (!visible) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <div className='overlay' >
        <div className='container'>
          <h1>{title}</h1>

          <div
            className="modal-body"
          >
            {children}
          </div>

          <div className='footer'>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <button
              className='delete-button'
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}
