import { ListObjectsV2Command, _Object } from "@aws-sdk/client-s3";
import { client } from "./s3-client";
import { useCallback, useEffect, useRef, useState } from "react";
import "./Gallery.css";
import { Image } from "primereact/image";

// Utility function to debounce state updates
const useDebounceCallback = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any[]) => void,
  delay: number
) => {
  const timeoutRef = useRef<number | null>(null);

  return useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

export function Gallery() {
  const [imageKeys, setImageKeys] = useState<string[]>([]);

  const debouncedSetImageKeys = useDebounceCallback((newKeys: string[]) => {
    setImageKeys((prevKeys) => [...prevKeys, ...newKeys]);
  }, 300);

  const loadPhotos = useCallback(async () => {
    const listObjectsCommand = new ListObjectsV2Command({
      Bucket: import.meta.env.VITE_BUCKET_NAME,
    });
    const { Contents } = await client.send(listObjectsCommand);
    if (Contents) {
      const newKeys = Contents.filter((c): c is _Object => !!c.Key)
        .map((c) => c.Key as string)
        .filter((key) => imageKeys.indexOf(key) === -1);
      debouncedSetImageKeys(newKeys);
    }
  }, [debouncedSetImageKeys, imageKeys]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  return (
    <>
      <h1>Gallery</h1>
      <div className="imageContainer">
        {imageKeys.map((key) => (
          <Image
            key={key}
            src={`https://s3-${import.meta.env.VITE_REGION}.amazonaws.com/${import.meta.env.VITE_BUCKET_NAME}/${key}`}
            width="250"
            className="galleryImage"
          />
        ))}
      </div>
    </>
  );
}
