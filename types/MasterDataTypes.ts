// BUSINESS UNIT
export type BURequest = {
  id: string;
  bu_code: string;
  bu_name: string;
  is_active: boolean;
  created_by: string;
  created_date: Date;
};

// CRITERIA
export type CriteriaRequest = {
  criteria_name: string;
  minimum_score: number;
  maximum_score: number;
  is_active: boolean;
};

export type Criteria = CriteriaRequest & {
  id: string;
  category_fk: string;
  created_by: string;
  created_date: Date;
};

export type CriteriaGroup = {
  id: string;
  value_code: string;
  value_name: string;
  created_by: string;
  created_date: Date;
  value_group: string;
};

// FUNCTION MENU
export type FunctionMenuRequest = {
  id: string;
  fm_code: string;
  fm_name: string;
  is_active: boolean;
  created_by: string;
  created_date: Date;
};

export type TermsPPRequest = {
  name: string;
  updated_by: string;
  updated_date: Date;
};

export type BriefRequest = {
  short_brief_name: string;
  updated_by: string;
  updated_date: Date;
};
