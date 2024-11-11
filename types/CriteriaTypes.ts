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
