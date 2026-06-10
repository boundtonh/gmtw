import Image from 'next/image'
import type { SpeciesPhoto } from '@/lib/woodSpecies.generated'

interface SpeciesPhotoMasonryProps {
  speciesName: string
  photos: SpeciesPhoto[]
  sectionTitle?: string
}

export function SpeciesPhotoMasonry({ speciesName, photos, sectionTitle }: SpeciesPhotoMasonryProps) {
  if (photos.length === 0) return null

  return (
    <div>
      {sectionTitle && (
        <h3 className="font-display text-2xl text-gmt-charcoal mb-6 mt-10">{sectionTitle}</h3>
      )}
      <div className="columns-2 md:columns-3 gap-3 md:gap-4">
        {photos.map((photo) => {
          const hasSize = photo.width && photo.height && photo.width > 0 && photo.height > 0

          return (
            <div key={photo.fileId} className="break-inside-avoid mb-3 md:mb-4">
              {hasSize ? (
                <Image
                  src={`/api/drive-image/${photo.fileId}`}
                  alt={`${speciesName} custom table — ${photo.name.replace(/\.[^.]+$/, '')}`}
                  width={photo.width!}
                  height={photo.height!}
                  className="w-full h-auto rounded-sm block"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              ) : (
                // Fallback when dimensions aren't known: use fixed aspect ratio
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-gmt-mist">
                  <Image
                    src={`/api/drive-image/${photo.fileId}`}
                    fill
                    alt={`${speciesName} custom table — ${photo.name.replace(/\.[^.]+$/, '')}`}
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
