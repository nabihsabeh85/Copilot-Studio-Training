import { useEffect, useState } from 'react'
import type { ScreenshotSlot as ScreenshotSlotType } from '../../content/types'

interface ScreenshotSlotProps {
  moduleId: number
  slot: ScreenshotSlotType
  index: number
}

function screenshotUrl(moduleId: number, index: number): string {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`
  return `${base}screenshots/${moduleId}-${index + 1}.png`
}

export function ScreenshotSlotCard({ moduleId, slot, index }: ScreenshotSlotProps) {
  const src = screenshotUrl(moduleId, index)
  const [hasImage, setHasImage] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (!cancelled) setHasImage(true)
    }
    img.onerror = () => {
      if (!cancelled) setHasImage(false)
    }
    img.src = src
    return () => {
      cancelled = true
    }
  }, [src])

  return (
    <div className="rounded-block border-2 border-dashed border-violet bg-violet-soft p-5">
      <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-violet">
        <CameraIcon />
        Screenshot slot
      </h3>
      {hasImage ? (
        <figure>
          <img src={src} alt={slot.caption} className="w-full rounded-inner border border-line" />
          <figcaption className="mt-2 font-mono text-[12.5px] text-violet">
            {slot.annotation}
          </figcaption>
        </figure>
      ) : (
        <>
          <p className="text-[14.5px]">{slot.caption}</p>
          <p className="mt-2 font-mono text-[12.5px] text-violet">{slot.annotation}</p>
          <p className="mt-3 font-mono text-xs text-muted">
            Image coming soon — drop{' '}
            <code className="rounded bg-card px-1">
              /public/screenshots/{moduleId}-{index + 1}.png
            </code>{' '}
            to replace this placeholder.
          </p>
        </>
      )}
    </div>
  )
}

function CameraIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="2" y="6" width="20" height="14" rx="3" />
      <circle cx="12" cy="13" r="4" />
      <path d="M8 6l1.5-3h5L16 6" />
    </svg>
  )
}
