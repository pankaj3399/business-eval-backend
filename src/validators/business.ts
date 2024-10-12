import Joi, { allow } from "joi";

export const createBusinessValidator = {
    body: Joi.object().keys({
      user_id: Joi.string(),
      business_name: Joi.string().required(),
      business_listing_price: Joi.number().required(),
      business_gross_revenue: Joi.number().required(),
      business_cash_flow: Joi.number().required(),
      business_notes: Joi.string().optional().allow(''),
      loan_sba_amount: Joi.number().required().allow(0),
      loan_sba_rate: Joi.number().required(),
      loan_sba_term: Joi.number().required(),
      loan_seller_amount: Joi.number().required(),
      loan_seller_rate: Joi.number().required(),
      loan_seller_term: Joi.number().required(),
      loan_down_payment: Joi.number().required().allow(0),
      desired_owner_salary: Joi.number().required().allow(0),
      additional_startup_capital: Joi.number().required().allow(0),
      additional_capital_expenses: Joi.number().required().allow(0),
      expected_annual_growth_rate: Joi.number().required(),
    }),
  };

  export const updateBusinessValidator = {
    body: Joi.object().keys({
        business_name: Joi.string(),
        business_listing_price: Joi.number(),
        business_gross_revenue: Joi.number(),
        business_cash_flow: Joi.number(),
        business_notes: Joi.string().optional().allow(''),
        loan_sba_amount: Joi.number(),
        loan_sba_rate: Joi.number(),
        loan_sba_term: Joi.number(),
        loan_seller_amount: Joi.number(),
        loan_seller_rate: Joi.number(),
        loan_seller_term: Joi.number(),
        loan_down_payment: Joi.number(),
        desired_owner_salary: Joi.number(),
        additional_startup_capital: Joi.number(),
        additional_capital_expenses: Joi.number(),
        expected_annual_growth_rate: Joi.number(),
    })
}
