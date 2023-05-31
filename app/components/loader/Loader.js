import Skeleton from "./Skeleton";

export function Loader() {
  return (
    <div className="space-x-3 space-y-8">
      <div className="space-y-8">
        <Skeleton className="w-[15ch] h-[1.25rem]" />
      </div>
      <div className="space-y-8">
        <Skeleton className="w-[25ch] h-[1.25rem]" />
      </div>
      <div className="space-y-8">
        <Skeleton className="w-[20ch] h-[1.25rem]" />
      </div>
      <div className="space-y-8">
        <Skeleton className="w-[17ch] h-[1.5rem]" />
      </div>
      <div className="space-y-8">
        <Skeleton className="w-[25ch] h-[1rem]" />
      </div>
      <div className="space-y-8">
        <Skeleton className="w-[15ch] h-[1.5rem]" />
      </div>
      <div className="space-y-8">
        <Skeleton className="w-[22ch] h-[1.5rem]" />
      </div>
      <div className="space-y-8">
        <Skeleton className="w-[20ch] h-[1.75rem]" />
      </div>
    </div>
  );
}
