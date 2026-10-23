import { cn } from '@/lib/utils'

/** Simple white ghost mark with a black outline, drawn for this clone. */
export function GhostLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn('shrink-0', className)}
    >
      <path
        d="M32 6c-9.4 0-16 7.2-16 16.6v6.2c-1.3.2-3.2-.6-4.3-.6-1.4 0-2.3.9-2.3 2 0 1.7 2.3 2.4 4.6 3.2 1.3.5 2.1 1.4 1.7 2.7-1.2 3.6-5 7.3-9.1 8-.8.2-1.2 1-.8 1.7.9 1.9 4.3 2.6 6 3 .5.1.6 1.6 1.1 2.4.4.6 1.2.7 2.1.5 1.8-.4 4-.6 6.1.4 2.7 1.3 5.6 4.4 10.9 4.4s8.2-3.1 10.9-4.4c2.1-1 4.3-.8 6.1-.4.9.2 1.7.1 2.1-.5.5-.8.6-2.3 1.1-2.4 1.7-.4 5.1-1.1 6-3 .4-.7 0-1.5-.8-1.7-4.1-.7-7.9-4.4-9.1-8-.4-1.3.4-2.2 1.7-2.7 2.3-.8 4.6-1.5 4.6-3.2 0-1.1-.9-2-2.3-2-1.1 0-3 .8-4.3.6v-6.2C48 13.2 41.4 6 32 6Z"
        fill="#fff"
        stroke="#000"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  )
}
