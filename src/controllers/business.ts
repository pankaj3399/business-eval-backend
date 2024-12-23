import { Request, Response } from "express";
import httpStatus from "http-status";
import businessService from "../services/business";
import catchAsync from "../utils/catchAsync";
import {PutObjectCommand, GetObjectCommand, S3Client} from"@aws-sdk/client-s3";
import {v4 as uuidv4} from "uuid";
import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
dotenv.config();


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export const createBusiness = catchAsync(async (req: Request, res: Response) => {
    const newBusiness = await businessService.createBusiness(req.body);
    res.status(httpStatus.CREATED).json({newBusiness});
});

export const updateBusiness = catchAsync(async (req: Request, res: Response) => {
    const updatedBusiness = await businessService.updateBusiness(req.params.id, req.body);
    res.status(httpStatus.OK).json({updatedBusiness});
});

export const getBusinessById = catchAsync(async (req: Request, res: Response) => {
    const business = await businessService.getBusinessById(req.params.id);
    res.status(httpStatus.OK).json({business});
});

export const getAllBusiness = catchAsync(async (req: any, res: Response) => {
    const businesses = await businessService.getAllBusinessMetrics(req.user._id);
    res.status(httpStatus.OK).json({businesses});
});

export const deleteBusiness = catchAsync(async (req: Request, res: Response) => {
    const deletedBusiness = await businessService.deleteBusiness(req.params.id);
    res.status(httpStatus.OK).json({deletedBusiness});
});

export const addNewMetric = catchAsync(async (req: Request, res: Response) => {
    const newMetric = await businessService.addNewMetric(req.params.id, req.body);
    res.status(httpStatus.OK).json({newMetric});
});

export const updateMetric = catchAsync(async (req: Request, res: Response) => {
    const updatedMetric = await businessService.updateMetric(req.params.id, req.body);
    res.status(httpStatus.OK).json({updatedMetric});
});
    
export const deleteMetric = catchAsync(async (req: Request, res: Response) => {
    const deletedMetric = await businessService.deleteMetric(req.params.id, req.body);
    res.status(httpStatus.OK).json({deletedMetric});
});

export const uploadFiles = catchAsync(async (req: Request, res: Response) => {
    //@ts-ignore
    if (!req.file) {
      console.log("No file uploaded");
      console.log(req.body);
      //@ts-ignore
      console.log(req.file);
  
      return res.status(400).send("No file uploaded");
    }
  
    //@ts-ignore
    const file = req.file;
    const fileKey = `${uuidv4()}.${file.originalname.split(".")[1]}`;
  
    // Upload the file to S3
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
  
    const uploadCommand = new PutObjectCommand(uploadParams);
    await s3Client.send(uploadCommand);
    console.log("File uploaded to S3");
  
    // Generate a presigned URL for the uploaded file
    const getObjectParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    };
  
    const presignedUrl = await getSignedUrl(s3Client, new GetObjectCommand(getObjectParams), {
      expiresIn: 60 * 60 * 24 * 1, // URL expires in 5 years
    });
  
    // Update the business record with the presigned URL
    const updatedBusiness = await businessService.uploadFile(req.params.id, presignedUrl, file.originalname);
    res.status(httpStatus.OK).json({ updatedBusiness, presignedUrl });
  });
