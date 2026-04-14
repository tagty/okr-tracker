import Link from "next/link";
import ObjectiveForm from "@/components/ObjectiveForm";

export default function NewObjectivePage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-lg font-bold text-zinc-900">OKR Tracker</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-6">
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-700">
            ← 戻る
          </Link>
          <h2 className="mt-3 text-xl font-semibold text-zinc-900">Objective を作成</h2>
        </div>

        <ObjectiveForm />
      </main>
    </div>
  );
}
