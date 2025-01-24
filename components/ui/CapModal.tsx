import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (maxSupply: string) => void;
  initialSupply: string;
}

export default function CapModal({ isOpen, onClose, onConfirm, initialSupply }: CapModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const maxSupply = formData.get('maxSupply') as string;
    
    if (!maxSupply || parseFloat(maxSupply) <= parseFloat(initialSupply)) {
      return;
    }
    
    onConfirm(maxSupply);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-2xl bg-thirty border-2 border-primary p-8">
          <div className="flex justify-between items-start mb-4">
            <Dialog.Title className="text-xl font-medium text-light">
              Set Maximum Supply
            </Dialog.Title>
            <button onClick={onClose} className="text-textSecondary hover:text-light">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="maxSupply" className="block text-sm font-medium text-textSecondary mb-2">
                Maximum supply must be greater than initial supply ({initialSupply})
              </label>
              <input
                type="number"
                name="maxSupply"
                id="maxSupply"
                min={parseFloat(initialSupply) + 1}
                step="any"
                required
                className="w-full px-4 py-2 bg-dark border border-secundary rounded-lg text-light focus:outline-none focus:border-primary"
                placeholder="Enter maximum supply"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-thirty text-light rounded-lg hover:bg-thirty/80 border border-secundary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Confirm
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 