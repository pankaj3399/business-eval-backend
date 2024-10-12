
import mongoose, { Schema, Document } from 'mongoose';

export interface IBusiness extends Document {
  user_id: string;
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

const businessSchema: Schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    business_name: { type: String, required: true },
    business_listing_price: { type: Number, required: true },
    business_gross_revenue: { type: Number, required: true },
    business_cash_flow: { type: Number, required: true },
    business_notes: { type: String },
    loan_sba_amount: { type: Number, required: true },
    loan_sba_rate: { type: Number, required: true },
    loan_sba_term: { type: Number, required: true },
    loan_seller_amount: { type: Number, required: true },
    loan_seller_rate: { type: Number, required: true },
    loan_seller_term: { type: Number, required: true },
    loan_down_payment: { type: Number, required: true},
    desired_owner_salary: { type: Number, required: true},
    additional_startup_capital: { type: Number, required: true},
    additional_capital_expenses: { type: Number, required: true},
    expected_annual_growth_rate: { type: Number, required: true}
});

export default mongoose.model<IBusiness>('Business', businessSchema);