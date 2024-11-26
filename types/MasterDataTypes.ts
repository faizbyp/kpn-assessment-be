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
  updated_by: string;
  updated_date: Date;
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

// SERIES
export type SeriesRequest = {
  id: string;
  series_name: string;
  is_active: boolean;
  created_by: string;
  created_date: Date;
};

// QUESTION
export type Answer = {
  text?: string;
  image?: File;
  point: number;
};

export type QuestionRequest = {
  id: string;
  q_seq: number;
  q_layout_type: string;
  q_input_text: string;
  q_input_image_url: string;
  answer_type: string;
  answer_choice_a_text?: string;
  answer_choice_a_image_url?: string;
  answer_choice_b_text?: string;
  answer_choice_b_image_url?: string;
  answer_choice_c_text?: string;
  answer_choice_c_image_url?: string;
  answer_choice_d_text?: string;
  answer_choice_d_image_url?: string;
  answer_choice_e_text?: string;
  answer_choice_e_image_url?: string;
  created_by: string;
  created_date: Date;
  updated_by?: string;
  updated_date?: Date;
  key_answer_point_a: number;
  key_answer_point_b: number;
  key_answer_point_c?: number;
  key_answer_point_d?: number;
  key_answer_point_e?: number;
};

export type QuestionFields = {
  q_seq?: number;
  q_layout_type?: string;
  q_input_text?: string;
  q_input_image?: File;
  answer_type?: string;
  answer?: Answer[];
};

export type QuestionResult = {
  id: string;
  answer_type: string;
  created_by: string;
  created_date: Date;
  updated_by: string;
  updated_date: Date;
  question: {
    seq: string;
    layout_type: string;
    input_text: string;
    input_image_url: string;
  };
  answers: Array<{ text?: string; image_url?: string; point: number }>;
};
