import Joi, { allow } from "joi";
import business from "../models/business";

const MetricSchema = Joi.object({
  value: Joi.number().required(),
  notes: Joi.array().items(Joi.string()).default([]),
}).default({ value: 0, notes: [] });

const MetricUpdateSchema = Joi.object({
  value: Joi.number(),
  notes: Joi.array().items(Joi.string()),
})
export const createBusinessValidator = {
  body: Joi.object().keys({
    user_id: Joi.string(),
    business_name: Joi.string().required(),
    business_location: Joi.string().required(),
    business_url: Joi.string().required(),
    business_notes: Joi.string().optional().allow(''),
    asking_price: MetricSchema,
    current_cashflow: MetricSchema,
    gross_revenue: MetricSchema,
    loan_sba: Joi.object({
      amount: Joi.number(),
      rate: Joi.number(),
      term: Joi.number(),
      notes: Joi.array().items(Joi.string()),
    }).optional().default({ amount: 0, rate: 0, term: 0, notes: [] }),
    additional_loan: Joi.object({
      amount: Joi.number(),
      rate: Joi.number(),
      term: Joi.number(),
      notes: Joi.array().items(Joi.string()),
    }).optional().default({ amount: 0, rate: 0, term: 0, notes: [] }),
    loan_down_payment: MetricSchema,
    expected_salary: MetricSchema,
    additional_startup_capital: MetricSchema,
    new_expenses: MetricSchema,
    growth_rate: MetricSchema,
  }),
};


  export const updateBusinessValidator = {
    body: Joi.object().keys({
      user_id: Joi.string(),
      business_name: Joi.string(),
      business_location: Joi.string(),
      business_url: Joi.string(),
      business_notes: Joi.string().optional().allow(''),
      asking_price: MetricUpdateSchema,
      current_cashflow: MetricUpdateSchema,
      gross_revenue: MetricUpdateSchema,
      loan_sba: Joi.object({
        amount: Joi.number(),
        rate: Joi.number(),
        term: Joi.number(),
        notes: Joi.array().items(Joi.string()),
      }).optional(),
      additional_loan: Joi.object({
        amount: Joi.number(),
        rate: Joi.number(),
        term: Joi.number(),
        notes: Joi.array().items(Joi.string()),
      }).optional(),
      loan_down_payment: MetricUpdateSchema,
      expected_salary: MetricUpdateSchema,
      additional_startup_capital: MetricUpdateSchema,
      new_expenses: MetricUpdateSchema,
      growth_rate: MetricUpdateSchema,
    }),
}

export const newMetricSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    value: Joi.number().required(),
    type: Joi.string().required().valid('$', 'X', 'N', '%'),
    notes: Joi.array().items(Joi.string()).default([]),
  })
}

export const updateMetricSchema = {
  body: Joi.object().keys({
    id: Joi.string().required(),
    value: Joi.number(),
    notes: Joi.array().items(Joi.string()),
  })
}