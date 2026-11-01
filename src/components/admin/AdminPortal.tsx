import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { useLanguage } from '@/i18n/useLanguage';

interface AdminPortalProps {
  onClose: () => void;
}

export function AdminPortal({ onClose }: AdminPortalProps) {
  const { copy } = useLanguage();
  const [password, setPassword] = useState<string | null>(null);

  return (
    <Modal
      open
      onClose={onClose}
      maxWidthClass={password ? 'max-w-5xl' : 'max-w-md'}
      labelledBy="admin-portal-title"
    >
      <div className="flex items-center gap-3 border-b border-navy-100 bg-navy-800 px-6 py-5 pr-16 text-white sm:px-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400 text-navy-900">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <h2 id="admin-portal-title" className="font-serif text-xl font-semibold">
          {copy.admin.portal}
        </h2>
      </div>

      {password ? (
        <AdminDashboard password={password} onSignOut={() => setPassword(null)} />
      ) : (
        <AdminLogin onAuthenticated={setPassword} />
      )}
    </Modal>
  );
}
