import { clsx } from 'clsx'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-md bg-background-tertiary',
        className
      )}
    />
  )
}

export function SkeletonText({ className }: SkeletonProps) {
  return <Skeleton className={clsx('h-4 w-full', className)} />
}

export function SkeletonTitle({ className }: SkeletonProps) {
  return <Skeleton className={clsx('h-6 w-48', className)} />
}

export function SkeletonAvatar({ className }: SkeletonProps) {
  return <Skeleton className={clsx('h-10 w-10 rounded-full', className)} />
}

export function SkeletonButton({ className }: SkeletonProps) {
  return <Skeleton className={clsx('h-10 w-24', className)} />
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'rounded-lg border border-border bg-background p-6',
        className
      )}
    >
      <div className="space-y-4">
        <SkeletonTitle />
        <SkeletonText />
        <SkeletonText className="w-3/4" />
      </div>
    </div>
  )
}
