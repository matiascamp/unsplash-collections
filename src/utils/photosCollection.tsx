import type { ImageProps } from "@/interfaces/images"
import DynamicImage from "@/components/dynamicImage"


type CollectionProps = {
  title: string
  photos: ImageProps[]
  photoCount: number
}


const PhotoCollection = ({ title, photos = [], photoCount }: CollectionProps) => {


  const renderPhotoLayout = () => {
    if (!photos || photos.length === 0) {
      return (
        <button className="w-full h-60  bg-gray-200 rounded-md" />
      )
    }

    if (photos.length === 1) {
      return (
        <button className="w-full h-full rounded-sm overflow-hidden flex cursor-pointer">
          <div className="w-full h-full">
            <DynamicImage
              src={photos[0].urls.regular}
              alt={"Collection photo"}
              className={"w-full h-full max-h-64"}
              width={400}
              height={400}
            />
          </div>
        </button>
      );
    }

    if (photos.length === 2) {
      return (
        <button className="w-full max-h-60 h-60 overflow-hidden flex rounded-sm gap-[3px] cursor-pointer">
          <div className="w-1/2">
            <DynamicImage
              src={photos[0].urls.regular}
              alt={"Collection photo 1"}
              className={"w-full h-full object-cover"}
              width={400}
              height={400}
            />
          </div>
          <div className="w-1/2">
            <DynamicImage
              src={photos[1].urls.regular}
              alt={"Collection photo 2"}
              className={"w-full h-full object-cover"}
              width={400}
              height={400}
            />
          </div>
        </button>
      );
    }

    return (
      <button className="w-full flex h-60 rounded-sm overflow-hidden gap-[3px] cursor-pointer">
        <div className="w-3/4 ">
          <DynamicImage
            src={photos[0].urls.small}
            alt={"Collection photo 1"}
            className={"w-full h-full object-cover"}
            width={400}
            height={400}
          />
        </div>
        <div className="w-1/4 h-auto flex flex-col gap-[3px]">
          <div className="h-1/2">
            <DynamicImage
              src={photos[1].urls.regular}
              alt={"Collection photo 2"}
              className={"w-full h-full object-cover"}
              width={400}
              height={400}

            />
          </div>
          <div className="h-1/2">
            <DynamicImage
              src={photos[2].urls.regular}
              alt={"Collection photo 3"}
              className={"w-full h-full object-cover"}
              width={400}
              height={400}
            />
          </div>
        </div>
      </button>
    );
  };


  return (
    <div className="h-60 max-h-60" >
      {renderPhotoLayout()}
      <div className="text-md font-semibold text-gray-900 flex items-end align-bottom pt-3 capitalize" > {title} </div>
      <p className="text-xs text-gray-500" >
        {photoCount || photos.length} photo{(photoCount || photos.length) !== 1 ? 's' : ''}
      </p>
    </div>
  )
}

export default PhotoCollection