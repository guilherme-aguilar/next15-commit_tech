export interface Condition {
  field: string;  // Nome do campo
  operator: "eq" | "ne" | "in"; // Operador
  value: string; // Valor que deve ser comparado
}