export type Operator = '+' | '-' | '×' | '÷' | null;

export interface CalculatorState {
    currentValue: string; // ディスプレイに表示する文字列[cite: 14]
    previousValue: string; // 演算前に保持していた値
    operator: Operator; // 選択された演算子
    isWaitingForNext: boolean; // 次の数字入力を持っているかどうか
}
