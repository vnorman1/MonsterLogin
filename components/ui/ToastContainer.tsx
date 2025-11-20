import React from 'react';
import { useToast, Toast as ToastType } from '../../contexts/ToastContext';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Toast: React.FC<{ toast: ToastType; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <CheckCircle size={20} />;
            case 'error':
                return <AlertCircle size={20} />;
            case 'warning':
                return <AlertTriangle size={20} />;
            case 'info':
                return <Info size={20} />;
        }
    };

    const getStyles = () => {
        switch (toast.type) {
            case 'success':
                return 'bg-black text-white border-black';
            case 'error':
                return 'bg-red-600 text-white border-red-600';
            case 'warning':
                return 'bg-yellow-500 text-black border-yellow-500';
            case 'info':
                return 'bg-blue-600 text-white border-blue-600';
            default:
                return 'bg-black text-white border-black';
        }
    };

    return (
        <div
            className={`flex items-center gap-3 px-4 py-3 rounded-sm border-2 ${getStyles()} shadow-[4px_4px_0px_rgba(0,0,0,1)] animate-slide-in-right mb-3 min-w-[300px] max-w-md`}
        >
            <div className="flex-shrink-0">{getIcon()}</div>
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
                onClick={() => onRemove(toast.id)}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
                aria-label="Close notification"
            >
                <X size={18} />
            </button>
        </div>
    );
};

export const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-6 right-6 z-[9999] flex flex-col items-end">
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onRemove={removeToast} />
            ))}
        </div>
    );
};
