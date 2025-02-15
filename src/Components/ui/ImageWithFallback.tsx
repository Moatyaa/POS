import { useState, useEffect } from 'react';
import Image from 'next/image';
import noImage from '../../../public/Icons/no-image.png';

const ImageWithFallback = ({
                               id,
                               resource,
                               width = 20,
                               height = 20,
                               className = "object-cover group-hover:scale-110 group-hover:opacity-90 group-hover:rotate-[2deg] transition-transform duration-300 ease-in-out"
                           }: {
    id: any;
    resource: string;
    width?: number;
    height?: number;
    className?: string;
}) => {
    const [imageSrc, setImageSrc] = useState(
        `${process.env.NEXT_PUBLIC_API_URL}/${resource}/image/${id}`
    );


    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setImageSrc(`${process.env.NEXT_PUBLIC_API_URL}/${resource}/image/${id}`);
        setHasError(false);
    }, [id, resource]);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (!hasError && e.currentTarget.src !== noImage.src) {
            setImageSrc(noImage.src);
            setHasError(true);
        }
    };

    return (
        <img
            src={imageSrc}
            alt={'Product Image'}
            width={width}
            height={height}
            className={className}
            onError={handleError}
        />
    );
};

export default ImageWithFallback;
