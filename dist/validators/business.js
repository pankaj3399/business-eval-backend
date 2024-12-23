"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMetricSchema = exports.newMetricSchema = exports.updateBusinessValidator = exports.createBusinessValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const MetricSchema = joi_1.default.object({
    value: joi_1.default.number().required(),
    notes: joi_1.default.array().items(joi_1.default.string()).default([]),
}).default({ value: 0, notes: [] });
const MetricUpdateSchema = joi_1.default.object({
    value: joi_1.default.number(),
    notes: joi_1.default.array().items(joi_1.default.string()),
});
exports.createBusinessValidator = {
    body: joi_1.default.object().keys({
        user_id: joi_1.default.string(),
        business_name: joi_1.default.string().required(),
        business_location: joi_1.default.string().required(),
        business_url: joi_1.default.string().required(),
        business_notes: joi_1.default.string().optional().allow(''),
        asking_price: MetricSchema,
        current_cashflow: MetricSchema,
        gross_revenue: MetricSchema,
        loan_sba: joi_1.default.object({
            amount: joi_1.default.number(),
            rate: joi_1.default.number(),
            term: joi_1.default.number(),
            notes: joi_1.default.array().items(joi_1.default.string()),
        }).optional().default({ amount: 0, rate: 0, term: 0, notes: [] }),
        additional_loan: joi_1.default.object({
            amount: joi_1.default.number(),
            rate: joi_1.default.number(),
            term: joi_1.default.number(),
            notes: joi_1.default.array().items(joi_1.default.string()),
        }).optional().default({ amount: 0, rate: 0, term: 0, notes: [] }),
        loan_down_payment: MetricSchema,
        expected_salary: MetricSchema,
        additional_startup_capital: MetricSchema,
        new_expenses: MetricSchema,
        growth_rate: MetricSchema,
    }),
};
exports.updateBusinessValidator = {
    body: joi_1.default.object().keys({
        user_id: joi_1.default.string(),
        business_name: joi_1.default.string(),
        business_location: joi_1.default.string(),
        business_url: joi_1.default.string(),
        business_notes: joi_1.default.string().optional().allow(''),
        asking_price: MetricUpdateSchema,
        current_cashflow: MetricUpdateSchema,
        gross_revenue: MetricUpdateSchema,
        loan_sba: joi_1.default.object({
            amount: joi_1.default.number(),
            rate: joi_1.default.number(),
            term: joi_1.default.number(),
            notes: joi_1.default.array().items(joi_1.default.string()),
        }).optional(),
        additional_loan: joi_1.default.object({
            amount: joi_1.default.number(),
            rate: joi_1.default.number(),
            term: joi_1.default.number(),
            notes: joi_1.default.array().items(joi_1.default.string()),
        }).optional(),
        loan_down_payment: MetricUpdateSchema,
        expected_salary: MetricUpdateSchema,
        additional_startup_capital: MetricUpdateSchema,
        new_expenses: MetricUpdateSchema,
        growth_rate: MetricUpdateSchema,
    }),
};
exports.newMetricSchema = {
    body: joi_1.default.object().keys({
        name: joi_1.default.string().required(),
        value: joi_1.default.number().required(),
        type: joi_1.default.string().required().valid('$', 'X', 'N', '%'),
        notes: joi_1.default.array().items(joi_1.default.string()).default([]),
    })
};
exports.updateMetricSchema = {
    body: joi_1.default.object().keys({
        id: joi_1.default.string().required(),
        value: joi_1.default.number(),
        notes: joi_1.default.array().items(joi_1.default.string()),
    })
};
//# sourceMappingURL=business.js.map