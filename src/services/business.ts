import httpStatus from "http-status";
import db from "../models";
import { TBusinessTypes } from "../types";
import ApiError from "../utils/ApiError";
import { calculateAllBusinessMetrics } from "../helpers/business";

const createBusiness = async (body: TBusinessTypes) => {
    // check existed business with same name
    if(body.user_id){
        const existingBusiness = await db.business.findOne({ business_name: body.business_name, user_id: body.user_id });
        if (existingBusiness) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Business name already exists');
        }
    }
    const business = await db.business.create(body);
    
    return business;
};

const updateBusiness = async (id: string, body: any) => {
    const checkBusiness = await db.business.findById(id);
    if (!checkBusiness) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Business not found');
    }
    const business = await db.business.findByIdAndUpdate(id, {
        $set: body
    },{new:true});

    
    return business;
};

const getBusinessById = async (id: string) => {
    const business = await db.business.findById(id);
    if(!business){
        throw new ApiError(httpStatus.NOT_FOUND, 'Business not found');
    }
    // const metrics = await calculateAllBusinessMetrics(business);
    return {data:business};
};

const getAllBusinessMetrics = async (user_id:string) => {
    const businesses = await db.business.find({user_id});
    // const metrics = await Promise.all(businesses.map(async (business) => {
    //     const metrics = await calculateAllBusinessMetrics(business);
    //     return {data:business, metrics};
    // }));
    return businesses;
};

const deleteBusiness = async (id: string) => {
    const business = await db.business.findByIdAndDelete(id);
    return business;
};

const addNewMetric = async (id:string, body:any) => {
    const business = await db.business.findByIdAndUpdate(id, {
        $push: {custom_fields: body}
    },{new:true});
    console.log(business);
    return business;
};

const updateMetric = async (id: string, body: any) => {
    const business = await db.business.findById(id);
    if (!business) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Business not found');
    }

    const { custom_fields } = business;
    if (!custom_fields || custom_fields.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Custom fields not found');
    }

    // Find the specific field to update
    const fieldIndex = custom_fields.findIndex((field: any) => field._id.toString() === body.id);
    if (fieldIndex === -1) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Custom field not found');
    }

    // Update the field
    custom_fields[fieldIndex].value = body.value;
    custom_fields[fieldIndex].notes = body.notes;

    // Save the updated business
    const updatedBusiness = await business.save();
    return updatedBusiness;
};

export const deleteMetric = async (id: string, body: any) => {
    const business = await db.business.findByIdAndUpdate(id, {
        $pull: {custom_fields: {_id: body.id}}
    },{new:true});
    return business;
};

const uploadFile = async (id: string, fileUrl: string, fileName: string) => {
    const business = await db.business.findByIdAndUpdate(id, 
        { $push: {business_attachments: {url: fileUrl, name: fileName}}
    },{new:true});
    return business;
};

const businessService = {
    createBusiness,
    updateBusiness,
    getBusinessById,
    getAllBusinessMetrics,
    deleteBusiness ,
    addNewMetric,
    updateMetric,
    deleteMetric,
    uploadFile
};

export default businessService