export default function ErrorCard({ message }: { message: string }) {
  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="rounded-3xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 p-5 flex items-start gap-4">
        <span className="text-2xl mt-0.5">🌧️</span>
        <div>
          <p className="text-sm font-semibold text-rose-700 dark:text-rose-400 mb-0.5">No encontramos esa ciudad</p>
          <p className="text-sm text-rose-600 dark:text-rose-500">{message}</p>
        </div>
      </div>
    </div>
  );
}