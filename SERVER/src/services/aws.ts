import { S3 } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { promisify } from "util";

export const s3Client = new S3({
	region: process.env.AWS_DEFAULT_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

export const UpdateImage = async (fileObject: any, url_image: string) => {
	const fileName = url_image.split("/").pop();

	const uploadParams = {
		Bucket: process.env.AWS_BUCKET,
		Key: fileName,
		Body: fileObject.buffer,
	};

	try {
		await s3Client.putObject(uploadParams);
	} catch (error) {
		return error;
	}
};

const randomBytesAsync = promisify(crypto.randomBytes);

export const AddImage = async (fileObject: any): Promise<string> => {
	const hash = await randomBytesAsync(16);
	const fileName: string = `${hash.toString("hex")}-${
		fileObject.originalname
	}`;
	try {
		const uploadParams = {
			Bucket: process.env.AWS_BUCKET,
			Key: fileName,
			Body: fileObject.buffer,
			ContentType: fileObject.mimetype,
		};

		await s3Client.putObject(uploadParams);
		return `https://cartesian-space.s3.us-east-1.amazonaws.com/${fileName}`;
	} catch (error) {
		console.error("Error uploading file to S3:", error);
		throw error;
	}
};