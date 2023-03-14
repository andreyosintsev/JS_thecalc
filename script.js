'use strict';

const buttons = document.querySelectorAll('.keypad-key');
const monitor = document.querySelector('.monitor');
let action = '';
let buffer = ['0'];


function handleButton(button) {
    if (button.classList.contains('action')) {
        handleAction(button);
    } else {
        if (buffer[0] === '0') {
            buffer[0] = button.innerHTML;
        } else {
            buffer[0] += button.innerHTML;
        }
        monitor.innerHTML = buffer[0];
    }
}

function init () {
    buttons.forEach(button => {
        button.addEventListener('click', (e)=>
        {
            handleButton(button);
        });    
    });
}

function handleAction(button) {
    switch (button.innerHTML)  {
        case 'AC': 
                buffer[0] = '0';
                buffer[1] = '0'; 
                monitor.innerHTML = buffer[0];
                break;
        case '±': 
                if (buffer[0].substring(0, 1) === '-') {
                    buffer[0] = buffer[0].substring(1);
                } else {
                    buffer[0] =  '-' + buffer[0]; 
                }
                monitor.innerHTML = buffer[0];
                break;
        case '.':
            if (buffer[0].indexOf('.') === -1) {
                buffer[0] += '.';
                monitor.innerHTML = buffer[0];
            } 
        break;
        case '←':
                if (buffer[0][buffer[0].length - 2] === '.' || buffer[0][buffer[0].length - 2] === '-') {
                    buffer[0] = buffer[0].substring(0, buffer[0].length - 2);
                } else {
                    buffer[0] = buffer[0].substring(0, buffer[0].length - 1);
                }
                if (buffer[0].length <= 0) {
                    buffer[0] = '0';
                }
                monitor.innerHTML = buffer[0];
                break;
        case '÷':
                action = 'div';
                buffer[1] = buffer[0];
                buffer[0] = '0';
                break;
        case '×':
                action = 'mul';
                buffer[1] = buffer[0];
                buffer[0] = '0';
                break;
        case '+':
                action = 'plus';
                buffer[1] = buffer[0];
                buffer[0] = '0';
                break;
        case '-':
                action = 'minus';
                buffer[1] = buffer[0];
                buffer[0] = '0';
                break;
        case '=':
                switch (action) {
                    case 'div':
                        buffer[0] = String(+buffer[1] / +buffer[0]);
                        break;
                    case 'mul':
                        buffer[0] = String(+buffer[1] * +buffer[0]);
                        break;
                    case 'plus':
                        buffer[0] = String(+buffer[1] + +buffer[0]);
                        break;
                    case 'minus':
                        buffer[0] = String(+buffer[1] - +buffer[0]);
                        break;
                }
                buffer[1] = '0';
                monitor.innerHTML = buffer[0];
                action = '';
                break;
        }    
}

init();