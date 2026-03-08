"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white">Something went wrong</h2>
        <p className="mt-2 text-sm text-gray-400">
          One or more data sources failed to respond.
        </p>
        <button
          onClick={reset}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
