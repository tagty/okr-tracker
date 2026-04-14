type KeyResult = {
  id: string;
  title: string;
  progress: number;
};

type Objective = {
  id: string;
  title: string;
  period: string;
  keyResults: KeyResult[];
  averageProgress: number;
};

type Props = {
  objective: Objective;
};

export default function ObjectiveCard({ objective }: Props) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-900">{objective.title}</h2>
          <p className="mt-0.5 text-xs text-zinc-400">{objective.period}</p>
        </div>
        <span className="text-sm font-semibold text-blue-600">
          {objective.averageProgress}%
        </span>
      </div>

      <div className="mb-4 h-2 w-full rounded-full bg-zinc-100">
        <div
          className="h-2 rounded-full bg-blue-500 transition-all"
          style={{ width: `${objective.averageProgress}%` }}
        />
      </div>

      <ul className="space-y-2">
        {objective.keyResults.map((kr) => (
          <li key={kr.id} className="flex items-center gap-2">
            <span className="flex-1 text-sm text-zinc-600">{kr.title}</span>
            <span className="text-xs font-medium text-zinc-500">{kr.progress}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
