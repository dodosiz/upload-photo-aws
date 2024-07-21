import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  FileUpload,
  FileUploadHandlerEvent,
  ItemTemplateOptions,
} from "primereact/fileupload";
import { Message } from "primereact/message";
import { ProgressBar } from "primereact/progressbar";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Status = "initial" | "uploading";

interface MessageProps {
  severity: "success" | "error";
  text: string;
}

const client = new S3Client({
  region: import.meta.env.VITE_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
  },
});

export function Upload() {
  const [status, setStatus] = useState<Status>("initial");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<MessageProps | undefined>(undefined);
  const handleUpload = async (event: FileUploadHandlerEvent) => {
    setStatus("uploading");
    const step = 100 / event.files.length;
    for (const file of event.files) {
      const command = new PutObjectCommand({
        Bucket: import.meta.env.VITE_BUCKET_NAME,
        Key: `${uuidv4()}.${file.name}`,
        Body: file,
      });
      client.send(command);
      setProgress((p) => p + Math.floor(step));
    }
    setProgress(100);
    await sleep(1000);
    setMessage({ severity: "success", text: "Photos uploaded!" });
    setStatus("initial");
    setProgress(0);
    await sleep(3000);
    setMessage(undefined);
  };
  return (
    <>
      <h1>Upload your photos</h1>
      {status === "initial" && (
        <Initial handleUpload={handleUpload} message={message} />
      )}
      {status === "uploading" && <Uploading progress={progress} />}
    </>
  );
}

interface UploadingProps {
  progress: number;
}

function Uploading(props: UploadingProps) {
  return (
    <>
      <p>Hold on your photos are beeing uploaded...</p>
      <ProgressBar value={props.progress}></ProgressBar>
    </>
  );
}

interface InitialProps {
  handleUpload: (event: FileUploadHandlerEvent) => void;
  message?: MessageProps;
}

function Initial(props: InitialProps) {
  return (
    <>
      {props.message && (
        <Message
          style={{ marginBottom: "20px" }}
          className="border-primary w-full justify-content-start"
          severity={props.message.severity}
          text={props.message.text}
        />
      )}
      <FileUpload
        multiple
        accept="image/*"
        maxFileSize={10000000}
        customUpload
        uploadHandler={props.handleUpload}
        itemTemplate={itemTemplate}
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
      />
    </>
  );
}

function itemTemplate(_file: object, options: ItemTemplateOptions) {
  return (
    <div className="p-fileupload-row">
      {options.previewElement} {options.fileNameElement} {options.removeElement}
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
