import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (values: any) => void;
  title: string;
  type: 'antiwhale' | 'antibot' | 'blacklist' | 'allowlist';
}

export default function SecurityModal({ isOpen, onClose, onConfirm, title, type }: SecurityModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    let values = {};
    
    switch (type) {
      case 'antiwhale':
        values = {
          maxHolderLimit: formData.get('maxHolderLimit'),
          maxTransactionAmount: formData.get('maxTransactionAmount')
        };
        break;
      case 'antibot':
        values = {
          tradingCooldown: formData.get('tradingCooldown')
        };
        break;
      case 'blacklist':
      case 'allowlist':
        // No necesitan inputs adicionales
        values = {};
        break;
    }
    
    onConfirm(values);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-2xl bg-thirty border-2 border-primary p-8">
          <div className="flex justify-between items-start mb-4">
            <Dialog.Title className="text-xl font-medium text-light">
              {title}
            </Dialog.Title>
            <button onClick={onClose} className="text-textSecondary hover:text-light">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {type === 'antiwhale' && (
              <>
                <div>
                  <label htmlFor="maxHolderLimit" className="block text-sm font-medium text-textSecondary mb-2">
                    Maximum tokens per holder
                  </label>
                  <input
                    type="number"
                    name="maxHolderLimit"
                    id="maxHolderLimit"
                    required
                    className="w-full px-4 py-2 bg-dark border border-secundary rounded-lg text-light focus:outline-none focus:border-primary"
                    placeholder="Enter max holder limit"
                  />
                </div>
                <div>
                  <label htmlFor="maxTransactionAmount" className="block text-sm font-medium text-textSecondary mb-2">
                    Maximum transaction amount
                  </label>
                  <input
                    type="number"
                    name="maxTransactionAmount"
                    id="maxTransactionAmount"
                    required
                    className="w-full px-4 py-2 bg-dark border border-secundary rounded-lg text-light focus:outline-none focus:border-primary"
                    placeholder="Enter max transaction amount"
                  />
                </div>
              </>
            )}

            {type === 'antibot' && (
              <div>
                <label htmlFor="tradingCooldown" className="block text-sm font-medium text-textSecondary mb-2">
                  Trading cooldown (in seconds)
                </label>
                <input
                  type="number"
                  name="tradingCooldown"
                  id="tradingCooldown"
                  min="1"
                  required
                  className="w-full px-4 py-2 bg-dark border border-secundary rounded-lg text-light focus:outline-none focus:border-primary"
                  placeholder="Enter cooldown in seconds"
                />
              </div>
            )}

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