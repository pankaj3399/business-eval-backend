export type TUserTypes = {
  name: string;
  email: string;
  password: string;
};

export type TBusinessTypes = {
    user_id?: string,
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
    },
    additional_startup_capital: {
      value: number,
      notes: string[]
    },
    new_expenses: {
      value: number,
      notes: string[]
    },
    growth_rate: {
      value: number,
      notes: string[]
    },
    custom_fields: {
      name: string,
      value: number,
      metricType: string,
      notes: string[],
      isIndependent: boolean
    }[]
}