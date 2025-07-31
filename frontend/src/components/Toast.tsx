import React, { useEffect } from 'react';
import { useToast, Toast as ToastType } from '../contexts/ToastContext';

interface ToastProps {
  toast: ToastType;
}

const Toast: React.FC<ToastProps> = ({ toast }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, removeToast]);

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-500 text-white border-green-600';
      case 'error':
        return 'bg-red-500 text-white border-red-600';
      case 'warning':
        return 'bg-yellow-500 text-white border-yellow-600';
      case 'info':
        return 'bg-blue-500 text-white border-blue-600';
      default:
        return 'bg-gray-500 text-white border-gray-600';
    }
  };

  const getToastIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  return (
    <div className={`${getToastStyles()} px-4 py-3 rounded-lg shadow-lg border-l-4 mb-2 min-w-80 max-w-md animate-slide-in-right`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <span className="text-lg">{getToastIcon()}</span>
          <p className="text-sm font-medium leading-relaxed">{toast.message}</p>
        </div>
        <button
          onClick={() => removeToast(toast.id)}
          className="text-white hover:text-gray-200 transition-colors ml-4 text-lg font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
