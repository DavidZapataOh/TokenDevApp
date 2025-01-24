import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const toastStyles = {
  style: {
    background: '#05000c',
    color: '#f5f5f5',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  success: {
    icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
    style: {
      border: '1px solid #B72C7A',
      background: '#191538',
    },
  },
  error: {
    icon: <XCircleIcon className="w-6 h-6 text-red-500" />,
    style: {
      border: '1px solid #531354',
      background: '#191538',
    },
  },
  loading: {
    icon: <Loader2 className="w-6 h-6 text-[#B72C7A] animate-spin" />,
    style: {
      border: '1px solid #191538',
      background: '#05000c',
    },
  },
};

export const customToast = {
  success: (message: string, id?: string) => 
    toast.success(message, {
      id,
      duration: 5000,
      style: { ...toastStyles.style, ...toastStyles.success.style },
      icon: toastStyles.success.icon,
    }),

  error: (message: string, id?: string) => 
    toast.error(message, {
      id,
      duration: 5000,
      style: { ...toastStyles.style, ...toastStyles.error.style },
      icon: toastStyles.error.icon,
    }),

  loading: (message: string, id?: string) => 
    toast.loading(message, {
      id,
      style: { ...toastStyles.style, ...toastStyles.loading.style },
      icon: toastStyles.loading.icon,
    }),
}; 