export default function Skeleton({ className }) {
  return (
    <div
      className={`bg-neutral-700 motion-safe:animate-pulse rounded ${className}`}
    />
  );
}
