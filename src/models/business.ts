import mongoose, { Schema, Document } from 'mongoose';

export interface IBusiness extends Document {
    user_id: string,
    business_name: string,
      asking_price: {
        value: number,
      notes: string[]
    },//Asking Price
    gross_revenue: {
      value: number,
      notes: string[]
    },
    current_cashflow: {
      value: number,
      notes: string[]
    },//Current Cashflow
    business_notes: string,
    loan_sba:{
      amount: number,
      rate: number,
      term: number
    },
    additional_loan:{
      amount: number,
      rate: number,
      term: number
    },
      loan_down_payment: {
        value: number,
      notes: string[]
    },
    expected_salary: {
      value: number,
      notes: string[]
    },//expected salary
    additional_startup_capital: {
      value: number,
      notes: string[]
    },
    new_expenses: {
      value: number,
      notes: string[]
    },//New Expenses
    growth_rate: {
      value: number,
      notes: string[]
    },//Growth Rate
    custom_fields: {
      name: string,
      value: number,
      metricType: string,
      notes: string[],
      isIndependent: boolean
    }[],
  
}

const customFieldsSchema = new Schema({
  id: {type:String},
  name: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true }, // Can store numbers or strings
  type: { type: String, enum: ['$', 'X', 'N', '%'], required: true },
  notes: { type: [String], default: [] },
  isIndependent : {type:Boolean, default:true}
});

const MetricSchema = new Schema({
  value : {type:Number, required:true, default:0},
  notes : {type:[String], default:[]}
});

const AttachmentSchema = new Schema({
  url: { type: String, required: true },
  name: { type: String, default: "" }
});

const businessSchema: Schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    business_name: { type: String, required: true },
    business_notes: { type: String },
    business_location: { type: String },
    business_url: { type: String },
    business_attachments: { type: [AttachmentSchema], default: [] },
    updated_at: { type: Date, default: Date.now },
    

    //Independent Metrics
    asking_price: MetricSchema,//Asking Price
    gross_revenue: MetricSchema,
    current_cashflow: MetricSchema,//Current Cashflow
    growth_rate: MetricSchema,//Growth Rate
    sde_value: MetricSchema,
    loan_sba:{
      amount: {type: Number, default:0},
      rate: {type: Number, default:0},
      term: {type: Number, default:0},
      notes: {type:[String], default:[]}
    },
    additional_loan:{
      amount: {type: Number, default:0},
      rate: {type: Number, default:0},
      term: {type: Number, default:0},
      notes: {type:[String], default:[]}
    },
    sde:MetricSchema,
    new_expenses: MetricSchema,//New Expenses
    expected_salary: MetricSchema,//expected salary
    loan_down_payment: MetricSchema,
    additional_startup_capital: MetricSchema,
    additional_debt: MetricSchema,
    dscr: MetricSchema,
    projected_cashflow: MetricSchema,
    gross_multiple: MetricSchema,
    sde_multiple: MetricSchema,
    sba_loan_payment: MetricSchema,
    additional_loan_payment:MetricSchema,
    total_debt_payments: MetricSchema,
    projected_net_profit_margin: MetricSchema,
    custom_fields: [customFieldsSchema]
});

businessSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

export default mongoose.model<IBusiness>('Business', businessSchema);