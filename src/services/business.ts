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
    });
    return business;
};

const getBusinessById = async (id: string) => {
    const business = await db.business.findById(id);
    if(!business){
        throw new ApiError(httpStatus.NOT_FOUND, 'Business not found');
    }
    const metrics = await calculateAllBusinessMetrics(business);
    return {data:business, metrics};
};

const getAllBusinessMetrics = async (user_id:string) => {
    const businesses = await db.business.find({user_id});
    const metrics = await Promise.all(businesses.map(async (business) => {
        const metrics = await calculateAllBusinessMetrics(business);
        return {data:business, metrics};
    }));
    return metrics;
};

const deleteBusiness = async (id: string) => {
    const business = await db.business.findByIdAndDelete(id);
    return business;
};

const businessService = {
    createBusiness,
    updateBusiness,
    getBusinessById,
    getAllBusinessMetrics,
    deleteBusiness 
};

export default businessService;