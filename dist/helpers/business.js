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
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAllBusinessMetrics = exports.calculateIRR = exports.calculateBasicMetrics = exports.calculateAdvancedProjections = exports.performSensitivityAnalysis = exports.calculateNPV = exports.calculateSellerLoanPayments = void 0;
const financial_1 = require("financial");
const calculateSellerLoanPayments = (sellerLoanAmount, sellerLoanInterest, sellerLoanTerm) => {
    // Convert annual interest rate to a monthly rate
    const monthlyInterestRate = sellerLoanInterest / 100 / 12;
    // Total number of payments
    const totalPayments = sellerLoanTerm * 12;
    if (sellerLoanAmount <= 0 || sellerLoanInterest < 0 || sellerLoanTerm <= 0) {
        throw new Error("Invalid input values for loan calculations.");
    }
    // Calculate monthly payment using the amortization formula
    let monthlyPayment;
    if (monthlyInterestRate > 0) {
        monthlyPayment = (sellerLoanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) /
            (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    }
    else {
        monthlyPayment = sellerLoanAmount / totalPayments; // No interest case
    }
    return Math.round(monthlyPayment * 100) / 100;
};
exports.calculateSellerLoanPayments = calculateSellerLoanPayments;
// Helper function to calculate NPV (Net Present Value)
const calculateNPV = (discountRate, cashFlows) => {
    return cashFlows.reduce((acc, cashFlow, index) => {
        return acc + cashFlow / Math.pow(1 + discountRate, index);
    }, 0);
};
exports.calculateNPV = calculateNPV;
const performSensitivityAnalysis = (initialCashFlow, baseGrowthRate) => {
    const scenarios = [
        ['Pessimistic', baseGrowthRate - 0.02],
        ['Base', baseGrowthRate],
        ['Optimistic', baseGrowthRate + 0.02]
    ];
    const analysis = {};
    scenarios.forEach(([scenario, growthRate]) => {
        const npvValues = [];
        [0.08, 0.10, 0.12].forEach((discountRate) => {
            const cashFlows = Array.from({ length: 5 }, (_, i) => initialCashFlow * Math.pow(1 + growthRate, i + 1));
            const npv = (0, exports.calculateNPV)(discountRate, [-initialCashFlow, ...cashFlows]);
            npvValues.push(Math.round(npv * 100) / 100);
        });
        analysis[scenario] = {
            growth_rate: Math.round(growthRate * 100 * 100) / 100,
            npv_low_discount: Math.round(npvValues[0]),
            npv_medium_discount: Math.round(npvValues[1]),
            npv_high_discount: Math.round(npvValues[2])
        };
    });
    return analysis;
};
exports.performSensitivityAnalysis = performSensitivityAnalysis;
const calculateAdvancedProjections = (initialCashFlow, growthRate, years) => {
    const projections = [];
    for (let year = 1; year <= years; year++) {
        const cashFlow = initialCashFlow * Math.pow(1 + growthRate, year);
        const revenue = cashFlow / 0.15; // Assuming 15% profit margin
        const expenses = revenue - cashFlow;
        projections.push({
            year,
            revenue: Math.round(Math.round(revenue * 100) / 100),
            expenses: Math.round(Math.round(expenses * 100) / 100),
            cash_flow: Math.round(Math.round(cashFlow * 100) / 100)
        });
    }
    return { advanced_projections: projections };
};
exports.calculateAdvancedProjections = calculateAdvancedProjections;
const calculateBasicMetrics = (listingPrice, grossRevenue, cashFlow, loanAmount, loanInterest, loanTerm, downPayment, startupCapital, ownerSalary, growthRate, sellerLoanPayment) => {
    // Calculate total investment
    const totalInvestment = downPayment + startupCapital;
    if (totalInvestment === 0) {
        throw new Error("Total investment cannot be zero");
    }
    // Calculate Return on Investment (ROI)
    const annualRoi = (cashFlow / totalInvestment) * 100;
    // Calculate Debt Service Coverage Ratio (DSCR)
    console.log(loanInterest, loanTerm, loanAmount);
    const annualDebtService = (0, financial_1.pmt)(loanInterest / 12, loanTerm * 12, -loanAmount);
    console.log(cashFlow, annualDebtService);
    const dscr = annualDebtService === 0 ? Infinity : cashFlow / (annualDebtService * 12);
    // Calculate Net Present Value (NPV)
    const discountRate = 0.1; // 10% discount rate
    const cashFlows = Array.from({ length: 5 }, (_, i) => cashFlow * Math.pow(1 + growthRate, i + 1));
    const npv = (0, exports.calculateNPV)(discountRate, [-totalInvestment, ...cashFlows]);
    // Calculate Internal Rate of Return (IRR)
    let irr;
    try {
        irr = (0, exports.calculateIRR)([-totalInvestment, ...cashFlows]);
    }
    catch (_a) {
        irr = null; // IRR calculation failed
    }
    // Calculate Break-even Revenue
    const fixedCosts = ownerSalary + (annualDebtService * 12);
    const variableCostRatio = 0.3; // Assume 30% of revenue goes to variable costs
    const breakEvenRevenue = fixedCosts / (1 - variableCostRatio);
    // Calculate Payback Period
    let cumulativeCashFlow = 0;
    let paybackPeriod = Infinity;
    for (let i = 0; i < cashFlows.length; i++) {
        cumulativeCashFlow += cashFlows[i];
        if (cumulativeCashFlow >= totalInvestment) {
            paybackPeriod = i + (totalInvestment - (cumulativeCashFlow - cashFlows[i])) / cashFlows[i];
            break;
        }
    }
    // Calculate Profit Margins
    const grossProfitMargin = grossRevenue === 0 ? 0 : (grossRevenue - (grossRevenue * variableCostRatio)) / grossRevenue * 100;
    const netProfitMargin = grossRevenue === 0 ? 0 : (cashFlow / grossRevenue) * 100;
    // Calculate Equity Multiple
    const totalCashFlow = cashFlows.reduce((acc, cf) => acc + cf, 0);
    const equityMultiple = totalCashFlow + listingPrice > 0 ? (totalCashFlow + listingPrice) / totalInvestment : 0;
    // Calculate SDE Multiple
    const sdeMultiple = cashFlow > 0 ? listingPrice / cashFlow : 0;
    // Calculate Yearly Debt Payments
    const yearlyDebtPayments = (annualDebtService * 12) + (sellerLoanPayment * 12);
    // Calculate Cash Flow After Purchase
    const cashFlowAfterPurchase = cashFlow - yearlyDebtPayments;
    return {
        roi: Math.round(annualRoi * 100) / 100,
        dscr: Math.round(dscr * 100) / 100,
        npv: Math.round(npv * 100) / 100,
        irr: irr !== null ? Math.round(irr * 100 * 100) / 100 : null,
        break_even_revenue: Math.round(breakEvenRevenue * 100) / 100,
        payback_period: Math.round(paybackPeriod * 100) / 100,
        gross_profit_margin: Math.round(grossProfitMargin * 100) / 100,
        net_profit_margin: Math.round(netProfitMargin * 100) / 100,
        equity_multiple: Math.round(equityMultiple * 100) / 100,
        sde_multiple: Math.round(sdeMultiple * 100) / 100,
        cash_flow_projection: cashFlows.map(cf => Math.round(cf * 100) / 100),
        cash_flow_after_purchase: Math.round(cashFlowAfterPurchase * 100) / 100,
        yearly_debt_payments: Math.round(yearlyDebtPayments * 100) / 100
    };
};
exports.calculateBasicMetrics = calculateBasicMetrics;
// Helper function to calculate PMT (Payment for a loan)
// export const calculatePMT = (interestRate: number, numPayments: number, principal: number): number => {
//     return (principal * interestRate * Math.pow(1 + interestRate, numPayments)) / 
//            (Math.pow(1 + interestRate, numPayments) - 1);
// }
function calculatePMT(rate, nper, pv, fv = 0, when = 'end') {
    const whenValue = convertWhen(when); // Convert 'when' to a numeric value
    const temp = Math.pow(1 + rate, nper); // (1 + rate) ** nper
    // Handle the case where rate is 0 (no interest)
    if (rate === 0) {
        return -(fv + pv) / nper;
    }
    const fact = (whenValue === 1 ? (1 + rate) : 1) * (temp - 1) / rate;
    return -(fv + pv * temp) / fact;
}
function convertWhen(when) {
    return when === 'begin' ? 1 : 0;
}
// Helper function to calculate IRR (Internal Rate of Return)
const calculateIRR = (cashFlows) => {
    const guess = 0.1; // Initial guess for IRR
    let rate = guess;
    let iterations = 100;
    let precision = 1e-6;
    while (iterations-- > 0) {
        const npv = (0, exports.calculateNPV)(rate, cashFlows);
        if (Math.abs(npv) < precision)
            break;
        const npvDerivative = cashFlows.reduce((acc, cashFlow, index) => acc - index * cashFlow / Math.pow(1 + rate, index + 1), 0);
        rate -= npv / npvDerivative;
    }
    return rate;
};
exports.calculateIRR = calculateIRR;
const calculateAllBusinessMetrics = (business) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const sellerLoanRate = parseFloat(`${(_a = business.additional_loan.rate) !== null && _a !== void 0 ? _a : 0}`);
    const sellerLoanTerm = parseInt(`${(_b = business.additional_loan.term) !== null && _b !== void 0 ? _b : 0}`, 10);
    const sellerLoanAmount = parseFloat(`${(_c = business.additional_loan.amount) !== null && _c !== void 0 ? _c : 0}`);
    const sellerLoadPayment = (0, exports.calculateSellerLoanPayments)(sellerLoanAmount, sellerLoanRate, sellerLoanTerm);
    const basicMetrics = (0, exports.calculateBasicMetrics)(business.asking_price.value, business.gross_revenue.value, business.current_cashflow.value, business.loan_sba.amount, business.loan_sba.rate / 100, business.loan_sba.term, business.loan_down_payment.value, business.additional_startup_capital.value, business.expected_salary.value, business.growth_rate.value / 100, sellerLoadPayment);
    basicMetrics.sellerLoadPayment = sellerLoadPayment;
    const advancedProjections = (0, exports.calculateAdvancedProjections)(business.current_cashflow.value, business.growth_rate.value / 100, 5);
    const sensitivityAnalysis = (0, exports.performSensitivityAnalysis)(business.current_cashflow.value, business.growth_rate.value / 100);
    return Object.assign(Object.assign({}, basicMetrics), { advancedProjections: advancedProjections.advanced_projections, sensitivityAnalysis });
});
exports.calculateAllBusinessMetrics = calculateAllBusinessMetrics;
//# sourceMappingURL=business.js.map