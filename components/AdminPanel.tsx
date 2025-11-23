// components/AdminPanel.tsx
'use client';
export default function AdminPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500">✕</button>
        <h2 className="text-xl font-semibold mb-4">Yönetici Paneli</h2>
        <p>İçerik buraya</p>
      </div>
    </div>
  );
}