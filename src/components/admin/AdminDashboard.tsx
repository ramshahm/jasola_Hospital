import { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Loader2, LogOut, RefreshCw } from 'lucide-react';
import { FeedbackCard } from '@/components/admin/FeedbackCard';
import { fetchPatientFeedback, resolvePatientFeedback, type PatientFeedback } from '@/lib/feedback';
import { useLanguage } from '@/i18n/useLanguage';

interface AdminDashboardProps {
  password: string;
  onSignOut: () => void;
}

type FilterKey = 'all' | 'open' | 'resolved';

export function AdminDashboard({ password, onSignOut }: AdminDashboardProps) {
  const { copy } = useLanguage();
  const [items, setItems] = useState<PatientFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterKey>('open');

  const loadFeedback = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setItems(await fetchPatientFeedback(password));
    } catch {
      setLoadError(copy.admin.loadError);
    } finally {
      setLoading(false);
    }
  }, [password, copy.admin.loadError]);

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);

  const handleResolve = async (id: string) => {
    setResolvingId(id);
    setActionError(null);
    try {
      await resolvePatientFeedback(password, id);
      const resolvedAt = new Date().toISOString();
      setItems((current) =>
        current.map((item) => (item.id === id ? { ...item, is_resolved: true, resolved_at: resolvedAt } : item)),
      );
    } catch {
      setActionError(copy.admin.updateError);
    } finally {
      setResolvingId(null);
    }
  };

  const counts = useMemo(() => {
    const resolved = items.filter((item) => item.is_resolved).length;
    return { all: items.length, open: items.length - resolved, resolved };
  }, [items]);

  const visibleItems = useMemo(() => {
    if (filter === 'open') return items.filter((item) => !item.is_resolved);
    if (filter === 'resolved') return items.filter((item) => item.is_resolved);
    return items;
  }, [items, filter]);

  const filters: { key: FilterKey; label: string; count: number }[] = [
    { key: 'all', label: copy.admin.filterAll, count: counts.all },
    { key: 'open', label: copy.admin.filterOpen, count: counts.open },
    { key: 'resolved', label: copy.admin.filterResolved, count: counts.resolved },
  ];

  return (
    <div className="flex min-h-0 flex-col gap-6 overflow-y-auto px-6 pb-8 pt-6 sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-serif text-2xl font-semibold text-navy-800">{copy.admin.dashboardTitle}</h3>
          <p className="max-w-2xl text-sm leading-relaxed text-ink-600">{copy.admin.dashboardSubtitle}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={loadFeedback}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-800 transition hover:border-teal-500 hover:text-teal-700 disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {copy.admin.refresh}
          </button>
          <button
            type="button"
            onClick={onSignOut}
            className="inline-flex items-center gap-2 rounded-full bg-ink-100 px-4 py-2 text-sm font-semibold text-ink-700 transition hover:bg-ink-200"
          >
            <LogOut className="h-4 w-4" />
            {copy.admin.signOut}
          </button>
        </div>
      </div>

      <div role="tablist" className="flex flex-wrap gap-2">
        {filters.map((option) => {
          const active = filter === option.key;
          return (
            <button
              key={option.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(option.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                active ? 'bg-navy-800 text-white shadow-card' : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
              }`}
            >
              {option.label}
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  active ? 'bg-gold-400 text-navy-900' : 'bg-white text-navy-700'
                }`}
              >
                {option.count}
              </span>
            </button>
          );
        })}
      </div>

      {actionError && (
        <p role="alert" className="rounded-2xl bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
          {actionError}
        </p>
      )}

      {loading && items.length === 0 ? (
        <div className="flex items-center justify-center gap-3 py-16 text-sm text-ink-600">
          <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
          {copy.admin.loading}
        </div>
      ) : loadError ? (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-error-100 bg-error-50 px-6 py-12 text-center">
          <p className="text-sm font-medium text-error-700">{loadError}</p>
          <button
            type="button"
            onClick={loadFeedback}
            className="rounded-full bg-error-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-error-700"
          >
            {copy.admin.refresh}
          </button>
        </div>
      ) : visibleItems.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-navy-200 px-6 py-14 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success-50 text-success-600">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <p className="text-sm text-ink-600">{copy.admin.empty}</p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {visibleItems.map((item) => (
            <FeedbackCard
              key={item.id}
              item={item}
              resolving={resolvingId === item.id}
              onResolve={() => handleResolve(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
