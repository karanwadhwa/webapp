import S3 from "aws-sdk/clients/s3";
import fs from "fs";

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
