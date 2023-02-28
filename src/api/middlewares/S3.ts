import S3 from "aws-sdk/clients/s3";
import fs from "fs";
import ImageModel from "../models/ImageModel";

export const s3Upload = async (
  file: Express.Multer.File,
  basePath: string
): Promise<S3.ManagedUpload.SendData> => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: basePath + Date.now() + file.originalname,
    Body: fileStream,
  };

  return new S3().upload(uploadParams).promise();
};

export const s3Delete = async (Key: string) => {
  return new S3().deleteObject({ Bucket: process.env.AWS_S3_BUCKET_NAME, Key }).promise();
};

export const s3DeleteDir = async (imgObjects: ImageModel[]) => {
  const Objects = imgObjects.map((img) => ({ Key: img.s3_bucket_path }));
  return new S3().deleteObjects(
    {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Delete: { Objects },
    },
    (err, data) => {
      if (err) console.log("s3 deleteobjects err", err);
      if (data) console.log("s3 deleteobjects data", data);
    }
  );
};
