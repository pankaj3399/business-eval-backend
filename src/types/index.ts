export type TUserTypes = {
  name: string;
  email: string;
  password: string;
};

export type TBusinessTypes = {
  user_id?: string;
  business_name: string;
  business_listing_price: number;
  business_gross_revenue: number;
  business_cash_flow: number;
  business_notes: string;
  loan_sba_amount: number;
  loan_sba_rate: number;
  loan_sba_term: number;
  loan_seller_amount: number;
  loan_seller_rate: number;
  loan_seller_term: number;
  loan_down_payment: number;
  desired_owner_salary: number;
  additional_startup_capital: number;
  additional_capital_expenses: number;
  expected_annual_growth_rate: number;
}