export type ErrorType = "not_found" | "network" | "unknown";

export default function ErrorCard({
  message,
  type,
}: {
  message: string;
  type: ErrorType;
}) {
  const config = {
    not_found: {
      emoji: "🔍",
      title: "Ciudad no encontrada",
      colors: "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40",
      titleColors: "text-amber-700 dark:text-amber-400",
      messageColors: "text-amber-600 dark:text-amber-500",
    },
    network: {
      emoji: "📡",
      title: "Error de conexión",
      colors: "border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40",
      titleColors: "text-rose-700 dark:text-rose-400",
      messageColors: "text-rose-600 dark:text-rose-500",
    },
    unknown: {
      emoji: "⚠️",
      title: "Algo salió mal",
      colors: "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900",
      titleColors: "text-zinc-700 dark:text-zinc-400",
      messageColors: "text-zinc-600 dark:text-zinc-500",
    },
  };

  const { emoji, title, colors, titleColors, messageColors } = config[type];

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className={`rounded-3xl border ${colors} p-5 flex items-start gap-4`}>
        <span className="text-2xl mt-0.5">{emoji}</span>
        <div>
          <p className={`text-sm font-semibold ${titleColors} mb-0.5`}>{title}</p>
          <p className={`text-sm ${messageColors}`}>{message}</p>
        </div>
      </div>
    </div>
  );
}