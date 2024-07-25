import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { client } from "./s3-client";
import { useEffect, useState } from "react";
import "./Gallery.css";
import { Image } from "primereact/image";

export function Gallery() {
  const [imageKeys, setImageKeys] = useState<string[]>([]);

  const loadPhotos = async () => {
    const listObjectsCommand = new ListObjectsV2Command({
      Bucket: import.meta.env.VITE_BUCKET_NAME,
    });
    const { Contents } = await client.send(listObjectsCommand);
    if (Contents) {
      Contents.map(async (c) => {
        if (c.Key) {
          setImageKeys([...imageKeys, c.Key]);
        }
      });
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <>
      <h1>Gallery</h1>
      <div className="imageContainer">
        {imageKeys.map((key) => {
          return (
            <Image
              key={key}
              src={`https://s3-${import.meta.env.VITE_REGION}.amazonaws.com/${import.meta.env.VITE_BUCKET_NAME}/${key}`}
              width="250"
              preview
            />
          );
        })}
      </div>
    </>
  );
}
