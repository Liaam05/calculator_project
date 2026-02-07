import type { CalculatorState, Operator } from "./types";
import { calculate } from "./logic";

// アプリが今どんな状況かを保持する変数
let state: CalculatorState = {
    currentValue: '0',
    previousValue: null,
    operator: null,
    isWaitingForNext: false,
};

// ディスプレイを更新する関数
const displayElement = document.querySelector('.display') as HTMLDivElement;
const updateDisplay = () => {
    displayElement.innerText = state.currentValue;
};

// ボタンがクリックされたときの処理
// ACボタン
const hendleClear = () => {
    state = {
        currentValue: '0',
        previousValue: null,
        operator: null,
        isWaitingForNext: false,
    };
    updateDisplay();
};

// 数字ボタン
const handleNumber = (num: string) => {
    if (state.isWaitingForNext) {
        // 演算子を押した直後なら新しい数字として扱う
        state.currentValue = num;
        state.isWaitingForNext = false;
    } else {
        // 0のみの場合は置き換え、それ以外は末尾に結合
        state.currentValue = state.currentValue === '0' ? num : state.currentValue + num;
    }
    updateDisplay();
}

// 演算子ボタン
const handleOperator = (op: Operator) => {
    state.previousValue = state.currentValue;
    state.operator = op;
    state.isWaitingForNext = true;
}

// イコールボタン
const handleEqual = () => {
    // 前の値か演算子がなければ、計算できないので何もしない
    if (state.previousValue === null || state.operator === null) return;

    // 文字列を数値に変換
    const a = parseFloat(state.previousValue);
    const b = parseFloat(state.currentValue);

    // 計算を実行
    const result = calculate(a, b, state.operator);

    // 結果をStateに反映
    if (result === 'Error') {
        state.currentValue = 'Error';
    } else {
        // 次の入力のために数値を文字列に変換して保存
        state.currentValue = result.toString();
    }

    // 計算後は前の値と演算子をクリア
    state.previousValue = null;
    state.operator = null;
    state.isWaitingForNext = true;
    
    updateDisplay();
}
 
// 各ボタンにイベントリスナーを設定
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        if (button.classList.contains('number')) {
            handleNumber(value);
        } else if (button.classList.contains('operator')) {
            handleOperator(value as Operator);
        } else if (button.classList.contains('clear')) {
            hendleClear();
        } else if (button.classList.contains('equal')) {
            handleEqual();
        }
    });
})

// 初期表示の更新
updateDisplay();
