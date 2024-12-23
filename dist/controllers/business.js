"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = exports.deleteMetric = exports.updateMetric = exports.addNewMetric = exports.deleteBusiness = exports.getAllBusiness = exports.getBusinessById = exports.updateBusiness = exports.createBusiness = void 0;
const http_status_1 = __importDefault(require("http-status"));
const business_1 = __importDefault(require("../services/business"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
dotenv_1.default.config();
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
exports.createBusiness = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBusiness = yield business_1.default.createBusiness(req.body);
    res.status(http_status_1.default.CREATED).json({ newBusiness });
}));
exports.updateBusiness = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBusiness = yield business_1.default.updateBusiness(req.params.id, req.body);
    res.status(http_status_1.default.OK).json({ updatedBusiness });
}));
exports.getBusinessById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const business = yield business_1.default.getBusinessById(req.params.id);
    res.status(http_status_1.default.OK).json({ business });
}));
exports.getAllBusiness = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const businesses = yield business_1.default.getAllBusinessMetrics(req.user._id);
    res.status(http_status_1.default.OK).json({ businesses });
}));
exports.deleteBusiness = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBusiness = yield business_1.default.deleteBusiness(req.params.id);
    res.status(http_status_1.default.OK).json({ deletedBusiness });
}));
exports.addNewMetric = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newMetric = yield business_1.default.addNewMetric(req.params.id, req.body);
    res.status(http_status_1.default.OK).json({ newMetric });
}));
exports.updateMetric = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedMetric = yield business_1.default.updateMetric(req.params.id, req.body);
    res.status(http_status_1.default.OK).json({ updatedMetric });
}));
exports.deleteMetric = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedMetric = yield business_1.default.deleteMetric(req.params.id, req.body);
    res.status(http_status_1.default.OK).json({ deletedMetric });
}));
exports.uploadFiles = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const fileKey = `${(0, uuid_1.v4)()}.${file.originalname.split(".")[1]}`;
    // Upload the file to S3
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
    };
    const uploadCommand = new client_s3_1.PutObjectCommand(uploadParams);
    yield s3Client.send(uploadCommand);
    console.log("File uploaded to S3");
    // Generate a presigned URL for the uploaded file
    const getObjectParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
    };
    const presignedUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, new client_s3_1.GetObjectCommand(getObjectParams), {
        expiresIn: 60 * 60 * 24 * 1, // URL expires in 5 years
    });
    // Update the business record with the presigned URL
    const updatedBusiness = yield business_1.default.uploadFile(req.params.id, presignedUrl, file.originalname);
    res.status(http_status_1.default.OK).json({ updatedBusiness, presignedUrl });
}));
//# sourceMappingURL=business.js.map