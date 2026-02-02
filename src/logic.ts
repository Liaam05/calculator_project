import type { Operator } from "./types";

export const calculate = (a: number, b: number, operator: Operator): number | 'Error' => {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '×': return a * b;
        case '÷': return b === 0 ? 'Error' : a / b; // ゼロ除算のエラーハンドリング
        default: return b;
    }
};
