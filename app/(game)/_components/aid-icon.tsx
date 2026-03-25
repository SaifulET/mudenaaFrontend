import type { AidId } from "./match-data";

export function AidIcon({
  aidId,
  className = "h-5 w-5",
}: {
  aidId: AidId;
  className?: string;
}) {
  switch (aidId) {
    case "hint":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M8 14c-1.2-1-2-2.8-2-4.5A6 6 0 1 1 18 9.5c0 1.7-.8 3.5-2 4.5-.6.5-1 1.2-1 2H9c0-.8-.4-1.5-1-2Z" />
        </svg>
      );
    case "swap":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 7h11" />
          <path d="m14 4 4 3-4 3" />
          <path d="M17 17H6" />
          <path d="m10 14-4 3 4 3" />
        </svg>
      );
    case "call":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.4 2.9a2 2 0 0 1-.6 1.8L7 10.3a16 16 0 0 0 6.7 6.7l1.9-1.9a2 2 0 0 1 1.8-.6l2.9.4A2 2 0 0 1 22 16.9Z" />
        </svg>
      );
    case "double":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m13 3-5 9h4l-1 9 5-9h-4l1-9Z" />
        </svg>
      );
  }
}
