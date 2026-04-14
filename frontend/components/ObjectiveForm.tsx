"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const PERIODS = ["2026 Q1", "2026 Q2", "2026 Q3", "2026 Q4"];

type FormState = {
  title: string;
  period: string;
  description: string;
};

export default function ObjectiveForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    title: "",
    period: PERIODS[0],
    description: "",
  });

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    // TODO: GraphQL mutation
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            タイトル <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="例: プロダクトの認知度を高める"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            期間 <span className="text-red-500">*</span>
          </label>
          <select
            value={form.period}
            onChange={(e) => setForm({ ...form, period: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {PERIODS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            説明 <span className="text-zinc-400 font-normal">（任意）</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            placeholder="この Objective の背景や目的を記入..."
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          作成する
        </button>
      </div>
    </form>
  );
}
