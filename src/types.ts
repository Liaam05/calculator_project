export type Operator = '+' | '-' | '×' | '÷' | null;

export interface CalculatorState {
    currentValue: string; // ディスプレイに表示する文字列[cite: 14]
    previousValue: string | null; // 演算前に保持していた値(nullを許容すると初期化が楽になる)
    operator: Operator; // 選択された演算子
    isWaitingForNext: boolean; // 次の数字入力を持っているかどうか
}
