import { X, Trash2 } from 'lucide-react';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
    itemType?: string;
}

export const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    itemName,
    itemType = 'item'
}: DeleteConfirmationModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 animate-in fade-in duration-200">
            <div className="bg-white rounded w-full max-w-md p-6 m-4 animate-in zoom-in-95 duration-200 border border-gray-100">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-800 shrink-0">
                            <Trash2 size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Supprimer {itemType}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Êtes-vous sûr de vouloir supprimer <span className="font-medium text-gray-900">{itemName}</span> ?
                                <br />Cette action est irréversible.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-white border border-gray-200 rounded text-gray-700 hover:bg-gray-50 text-sm transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-900 text-sm transition-colors"
                        >
                            Confirmer la suppression
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
