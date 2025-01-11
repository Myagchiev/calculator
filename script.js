        let calculator = document.querySelector(".calculator");
        let result = document.querySelector(".result");
        let cleanBtn = document.querySelector(".cleanBtn");
        
        let num1 = null;
        let num2 = null;
        let operator = null;
        
        calculator.addEventListener('click', evt => {
            if (evt.target.matches('.number')) {
                result.value += evt.target.value; // Добавление числа в результат
            } else if (evt.target.matches('.action')) {
                if (evt.target.value === '=') {
                    if (num1 !== null && operator !== null) {
                        num2 = parseFloat(result.value);
                        result.value = operate(num1, operator, num2); // Вычисление результата
                        num1 = null; // Сброс после вычисления
                        operator = null; // Сброс после вычисления
                    }
                } else if (evt.target.value === 'C' || evt.target.classList.contains('cleanBtn')) {
                    result.value = ''; // Очистка результата
                    num1 = null; // Сброс первого числа
                    num2 = null; // Сброс второго числа
                    operator = null; // Сброс оператора
                } else {
                    if (num1 === null) {
                        num1 = parseFloat(result.value);
                    } else {
                        num2 = parseFloat(result.value);
                        result.value = operate(num1, operator, num2); // Вычисление при новом операторе
                        num1 = parseFloat(result.value); // Сохранение результата как первого числа
                    }
                    operator = evt.target.value; // Установка оператора
                    result.value = ''; // Очистка для следующего ввода
                }
            }
        });


function operate(num1, operator, num2) {
            switch (operator) {
                case '+':
                    return num1 + num2;
                case '-':
                    return num1 - num2;
                case '*':
                    return num1 * num2;
                case '/':
                    return num2 !== 0 ? num1 / num2 : 'Error: Division by zero';
                default:
                    return 'Error: Invalid operator';
            }
        }