import { useState, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X } from 'lucide-react';

// PWA 更新提示：新版本（含新题库）部署后提示刷新，避免同学一直看旧缓存
export default function UpdateBanner() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, r) {
      r && setInterval(() => r.update(), 60 * 60 * 1000);  // 每小时检查
    },
  });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (offlineReady) setOfflineReady(false);
  }, [offlineReady, setOfflineReady]);

  if ((!needRefresh && !offlineReady) || hidden) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
      <div className="bg-slate-900 text-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
        <span className="flex-1 text-sm font-medium">
          {needRefresh ? '题库有更新啦' : '已可离线使用'}
        </span>
        {needRefresh && (
          <button
            onClick={() => updateServiceWorker(true)}
            className="min-h-9 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <RefreshCw size={13} /> 刷新
          </button>
        )}
        <button
          onClick={() => {
            setNeedRefresh(false);
            setHidden(true);
          }}
          aria-label="关闭提示"
          className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
