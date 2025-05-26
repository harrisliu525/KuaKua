export interface FormValues {
  target: string;
  scenario?: string;
}

export interface Compliment {
  content: string;
  technique: string;
  logic: string;
}

export interface ComplimentResponse {
  compliments: Compliment[];
}