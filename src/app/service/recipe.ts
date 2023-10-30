export interface recipe {
  id: string;
  name: string;
  ingredients: { id: number, value: string }[]; // Sử dụng kiểu dữ liệu string[] cho ingredients
  instructions: string;
}
