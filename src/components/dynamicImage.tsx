import Image from "next/image"

type DynamicImageProps = {
    className?: string
    width: number
    height: number
    alt: string
    src: string
    sizes?: string
    priority?: boolean
    blurHash?: string
}

const DynamicImage = ({ 
    className, 
    width, 
    height, 
    alt, 
    src, 
    sizes = "(max-width: 768px) 100%, (max-width: 1200px) 50vw, 33vw",
    priority = false
}: DynamicImageProps) => {
    const BLUR_PLACEHOLDER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8cPxCPQAHvgLotJD2iAAAAABJRU5ErkJggg==';

    return (
        <Image 
            src={src}
            className={className}
            width={width}
            height={height}
            alt={alt}
            placeholder="blur"
            blurDataURL={ BLUR_PLACEHOLDER}
            sizes={sizes}
            priority={priority}
            loading={priority ? undefined : "lazy"}
        />
    )
}

export default DynamicImage