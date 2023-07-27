export type QType = {
  description: string;
  answer: string;
  cost: number;
};
export type WSType = {
  title: string;
  description: string;
  price: number;
  cost: number;
  questions: QType[];
};
