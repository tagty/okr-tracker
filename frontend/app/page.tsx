"use client";

import { useState } from "react";
import ObjectiveCard from "@/components/ObjectiveCard";

type KeyResult = { id: string; title: string; progress: number };
type Objective = {
  id: string;
  title: string;
  period: string;
  averageProgress: number;
  keyResults: KeyResult[];
};

const INITIAL_OBJECTIVES: Objective[] = [
  {
    id: "1",
    title: "プロダクトの認知度を高める",
    period: "2026 Q1",
    averageProgress: 60,
    keyResults: [
      { id: "1", title: "SNS フォロワーを 1,000 人に増やす", progress: 80 },
      { id: "2", title: "ブログ記事を 10 本公開する", progress: 40 },
    ],
  },
  {
    id: "2",
    title: "開発生産性を向上させる",
    period: "2026 Q1",
    averageProgress: 30,
    keyResults: [
      { id: "3", title: "CI/CD パイプラインを整備する", progress: 50 },
      { id: "4", title: "テストカバレッジを 80% に引き上げる", progress: 10 },
    ],
  },
];

export default function Home() {
  const [objectives, setObjectives] = useState<Objective[]>(INITIAL_OBJECTIVES);

  function handleAdd() {
    // TODO: GraphQL mutation
    const newObjective: Objective = {
      id: String(Date.now()),
      title: "新しい Objective",
      period: "2026 Q2",
      averageProgress: 0,
      keyResults: [],
    };
    setObjectives((prev) => [...prev, newObjective]);
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <h1 className="text-lg font-bold text-zinc-900">OKR Tracker</h1>
          <button
            onClick={handleAdd}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Objective を追加
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="space-y-4">
          {objectives.map((objective) => (
            <ObjectiveCard key={objective.id} objective={objective} />
          ))}
        </div>
      </main>
    </div>
  );
}
