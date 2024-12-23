"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const customFieldsSchema = new mongoose_1.Schema({
    id: { type: String },
    name: { type: String, required: true },
    value: { type: mongoose_1.Schema.Types.Mixed, required: true }, // Can store numbers or strings
    type: { type: String, enum: ['$', 'X', 'N', '%'], required: true },
    notes: { type: [String], default: [] },
    isIndependent: { type: Boolean, default: true }
});
const MetricSchema = new mongoose_1.Schema({
    value: { type: Number, required: true, default: 0 },
    notes: { type: [String], default: [] }
});
const AttachmentSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    name: { type: String, default: "" }
});
const businessSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    business_name: { type: String, required: true },
    business_notes: { type: String },
    business_location: { type: String },
    business_url: { type: String },
    business_attachments: { type: [AttachmentSchema], default: [] },
    updated_at: { type: Date, default: Date.now },
    //Independent Metrics
    asking_price: MetricSchema, //Asking Price
    gross_revenue: MetricSchema,
    current_cashflow: MetricSchema, //Current Cashflow
    growth_rate: MetricSchema, //Growth Rate
    sde_value: MetricSchema,
    loan_sba: {
        amount: { type: Number, default: 0 },
        rate: { type: Number, default: 0 },
        term: { type: Number, default: 0 },
        notes: { type: [String], default: [] }
    },
    additional_loan: {
        amount: { type: Number, default: 0 },
        rate: { type: Number, default: 0 },
        term: { type: Number, default: 0 },
        notes: { type: [String], default: [] }
    },
    sde: MetricSchema,
    new_expenses: MetricSchema, //New Expenses
    expected_salary: MetricSchema, //expected salary
    loan_down_payment: MetricSchema,
    additional_startup_capital: MetricSchema,
    additional_debt: MetricSchema,
    dscr: MetricSchema,
    projected_cashflow: MetricSchema,
    gross_multiple: MetricSchema,
    sde_multiple: MetricSchema,
    sba_loan_payment: MetricSchema,
    additional_loan_payment: MetricSchema,
    total_debt_payments: MetricSchema,
    projected_net_profit_margin: MetricSchema,
    custom_fields: [customFieldsSchema]
});
businessSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});
exports.default = mongoose_1.default.model('Business', businessSchema);
//# sourceMappingURL=business.js.map