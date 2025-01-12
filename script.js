        let calculator = document.querySelector(".calculator");
        let cleanBtn = document.querySelector(".cleanBtn");
        let result = document.querySelector(".result");
        let num1 = null;
        let num2 = null;
        let operator = null;
        

        calculator.addEventListener('click', evt => {
            if (evt.target.matches('.number')) {
                result.value += evt.target.value;
                toggleDecimalButton();
            } else if (evt.target.matches('#decimal')) {
                if (!result.value.includes('.')) {
                    result.value += '.';
                }
                toggleDecimalButton();
            } else if (evt.target.matches('.action')) {
                if (evt.target.value === '=') {
                    if (num1 !== null && operator !== null) {
                        num2 = parseFloat(result.value);
                        result.value = operate(num1, operator, num2);
                        num1 = null;
                        operator = null;
                    }
                } else if (evt.target.value === "CLEAN" || evt.target.classList.contains("cleanBtn")) {
                    result.value = '';
                    num1 = null;
                    num2 = null;
                    operator = null;
                    toggleDecimalButton();
                } else if (evt.target.value === "DEL") {
                    deleteLast();
                } else {
                    if (num1 === null) {
                        num1 = parseFloat(result.value);
                    } else {
                        num2 = parseFloat(result.value);
                        result.value = operate(num1, operator, num2);
                        num1 = parseFloat(result.value);
                    }
                    operator = evt.target.value;
                    result.value = '';
                }
            }
        });

        function deleteLast() {
            result.value = result.value.slice(0, -1);
            toggleDecimalButton();
        }

        function toggleDecimalButton() {
            const decimalButton = document.querySelector('#decimal');
            if (result.value.includes('.')) {
                decimalButton.disabled = true;
            } else {
                decimalButton.disabled = false;
            }
        }

        function operate(num1, operator, num2) {
            switch (operator) {
             case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num2 !== 0 ? num1 / num2 : 'Ошибка';
            default:
                return '';
          }
        }




    /// ДАЛЬШЕ АНИМАЦИЯ!!!

        const canvas = document.createElement("canvas");
const body = document.querySelector("body");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

body.appendChild(canvas);

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const CIRCLE_COUNT = 1 + Math.floor(Math.random() * 20);
const CIRCLE_RADIUS = 5 + Math.floor(Math.random() * 10);
const CIRCLE_COLOR = "#2d145c";
const LINE_WIDTH = 1;
const LINE_COLOR = "#2d145c";

const context = canvas.getContext("2d");

context.fillStyle = CIRCLE_COLOR;
context.strokeStyle = LINE_COLOR;
context.lineWidth = LINE_WIDTH;
// round doesnt work? 🤷‍♀️
context.lineJoin = "round";
// Transparancy on lines doesn't work for some reason
// context.globalAlpha = 0.5;

// Setup point data
const points = Array(CIRCLE_COUNT)
  .fill(null)
  .map(() => {
    return {
      coordinates: getRandomCoordinates(),
      directions: getRandomDirection()
    };
  });

function draw() {
  requestAnimationFrame(draw);

  context.clearRect(0, 0, WIDTH, HEIGHT);

  // Setup line coordinates
  for (const { coordinates, directions } of points) {
    const lines = Array(points.length - 1)
      .fill(null)
      .map((_, i) => {
        return {
          from: {
            x: points[i].coordinates.x,
            y: points[i].coordinates.y
          },
          to: {
            x: points[i + 1].coordinates.x,
            y: points[i + 1].coordinates.y
          }
        };
      });

    // Draw lines
    for (const { from, to } of lines) {
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.lineTo(to.x, to.y);
      context.stroke();
    }

    // Move points around randomly
    coordinates.x += directions.x;
    coordinates.y += directions.y;

    // Draw circles
    context.beginPath();
    context.arc(coordinates.x, coordinates.y, CIRCLE_RADIUS, 0, 2 * Math.PI);
    context.fill();

    // Horizontal borders
    if (
      coordinates.x + CIRCLE_RADIUS > WIDTH ||
      coordinates.x - CIRCLE_RADIUS < 0
    ) {
      directions.x *= -1;
    }

    // Vertical borders
    if (
      coordinates.y + CIRCLE_RADIUS > HEIGHT ||
      coordinates.y - CIRCLE_RADIUS < 0
    ) {
      directions.y *= -1;
    }
  }
}

draw();

function getRandomCoordinates() {
  return {
    x: CIRCLE_RADIUS + Math.floor(Math.random() * WIDTH) - CIRCLE_RADIUS * 2,
    y: CIRCLE_RADIUS + Math.floor(Math.random() * HEIGHT) - CIRCLE_RADIUS * 2
  };
}

function getRandomDirection() {
  return {
    x: Math.random() > 0.5 ? 1 : -1,
    y: Math.random() > 0.5 ? 1 : -1
  };
}