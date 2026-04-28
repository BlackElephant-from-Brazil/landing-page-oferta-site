"use client";

import clsx from "clsx";

interface BrandLockupProps {
  compact?: boolean;
  className?: string;
  symbolOnly?: boolean;
}

function LogoSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160.2 174.07"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M36.5,119.76c-16.45-1.95-30.07-15.22-34.01-30.99C-.4,77.17-.59,28.04.98,15.23,2.02,6.77,10.27.79,18.47.72c30.96,1.82,64.42-2.3,95.07,0,22.6,1.69,41.19,17.33,45.2,39.8-3.62,30.41,7.07,84.14-2.98,111.5-13.38,36.42-65.14,23.9-61.76-9.77,1.64-16.34,23.54-16.2,26.57-3.56,1.09,4.56-.07,9.32.6,13.9,12.43,7.89,20.28-9.84,19.75-20.17-1.32-25.69-24.58-29.49-43.44-35.64-31.5-10.29-42.65-50.19-24.48-77.02H22.5c-1.27,0-2.37,3.13-2.55,4.45-1.15,8.56-1.01,53.92,1,61.1,7.83,28.01,47.08,6.6,61.54,20.46,2.82,2.7,7.39,10.85,4.01,13.99-15.8-1.36-34.57,1.83-50,0ZM122.75,53.07c0-4.49-3.64-8.13-8.13-8.13s-8.13,3.64-8.13,8.13,3.64,8.13,8.13,8.13,8.13-3.64,8.13-8.13Z" />
      <circle cx="114.62" cy="53.07" r="8.13" />
    </svg>
  );
}

export default function BrandLockup({
  compact = false,
  className,
  symbolOnly = false,
}: BrandLockupProps) {
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <LogoSymbol
        className={clsx(
          "text-white drop-shadow-[0_0_22px_rgba(57,254,21,0.18)]",
          compact ? "h-7 w-7" : "h-11 w-11 sm:h-12 sm:w-12",
        )}
      />
      {!symbolOnly ? (
        <span
          className={clsx(
            "font-medium leading-none tracking-normal text-white",
            compact ? "text-lg" : "text-[1.55rem] sm:text-[1.85rem]",
          )}
        >
          Black<span className="text-brand">Elephant</span>
        </span>
      ) : null}
    </div>
  );
}
