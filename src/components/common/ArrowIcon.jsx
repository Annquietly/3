export default function ArrowIcon({ className = 'h-[0.72em] w-[0.72em]' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <path
        d="M2 1h7v7M9 1 1 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
