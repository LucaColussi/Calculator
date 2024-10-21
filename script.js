let display = document.querySelector(".display");
let pi = document.createElement("p");
display.appendChild(pi);
let written = false;

let previous = document.createElement("p");
display.appendChild(previous);
previous.id = "previous";

function drawButtons() {
    let cont = document.querySelector(".buttons");
    cont.style.display = "flex";
    cont.style.flexWrap = "wrap";
    cont.style.gap = "10px";
    const W = (window.innerWidth - 240) / 5;
    const buttons = [
        '7', '8', '9', 'AC', '/',
        '4', '5', '6', '+/-', '*',
        '1', '2', '3', '%', '-',
        'git', '0', ',', '=', '+'
    ];

    for(let i = 0; i < 20; i++){
        let bt = document.createElement("button");
        bt.classList.add("btn");
        bt.style.width = W + "px";
        if(buttons[i] === "git") {
            bt.innerHTML = `
                    <img src="./images/gitIcon.png" alt="GitHub" style="width: 40px; height: 40px;">
            `;
        } else {
            bt.innerHTML = buttons[i];
        }
        bt.id = buttons[i];
        bt.onclick = function() {
            writeOnDisplay(buttons[i]);
        };
        

        if (i % 5 < 3) {
            bt.style.backgroundColor = "#2a2a2c";
        }

        if (i === 3 || i === 8 || i === 13) {
            bt.style.backgroundColor = "#5c5c5f"; 
            
        }
        
        cont.appendChild(bt);
    }
}

function writeOnDisplay(value) {
    if(value === "git") {
        window.open("https://github.com/LucaColussi");
        return;
    }    
    const operators = ['+', '-', '*', '/', '%', ','];
    if(written && value !== "=") {
        if(!operators.includes(value)) {
            erase(0);
        } 
        written = false;
    }
    if(getLastExp(pi.textContent) === "0" && value !== "+" && value !== "/" && value !== "*" && value !== "%" && value !== "," && value !== "=") {
        let text = pi.textContent;
        let newText = text.slice(0, -1);
        pi.textContent = newText;
    }
    if(value === "=") {
        evaluate(pi.textContent);
    }
    else if(value === "AC") {
        erase(0);
        previousOperations("")
    } 
    else if(value === "+/-"){

    }
    else if(value === ","){
        if(!isPresentComma(pi.textContent)) {
            write(value);
        }
    }
    else if(value === "+" || value === "-" || value === "/" || value === "*" || value === "%") {
        if(!isNear(pi.textContent)){
            write(value);
        }
    } 
    else {
        write(value);
    }
}

function write(text) {
    pi.textContent += text;
}

function erase(tmp) {
    pi.innerText = tmp;
}

function isPresentComma(exp) {
    if(getLastExp(exp).includes(",") || isNear(exp)) return true;
    return false;
}

function isNear(exp) {
    const operators = ['+', '-', '*', '/', '%', ','];
    if(operators.includes(exp.slice(-1))) return true;
    return false;
}

function getLastExp(exp) {
    // L'espressione regolare cerca l'ultimo numero che segue un operatore
    const match = exp.match(/.*[+\-*/%]\s*([\d,.]+)\s*$/);
    
    // Se trova un match, restituisce il numero catturato, altrimenti restituisce la stringa intera
    return match ? match[1] : exp.trim();
}

function getLastOperator(exp) {
        // L'espressione regolare cerca l'ultimo operatore nella stringa
        const match = exp.match(/[+\-*/%](?=[^+\-*/%]*$)/);
        
        // Se trova un match, restituisce l'operatore trovato, altrimenti null
        console.log(match ? match[0] : null);
        return match ? match[0] : null;
}

function previousOperations(exp) {
    previous.innerText = exp;
}

function evaluate(exp) {
    try {
        let originalExp = exp;
        exp = exp.replace(/,/g, ".");
        let result = eval(exp);
        
        // Arrotonda il risultato a 10 decimali per evitare problemi di precisione
        result = parseFloat(result.toFixed(10));
        result = result.toString().replace(".", ",");
        pi.textContent = result;
        if(result.toString() !== originalExp){
            previousOperations(originalExp);
        }
        written = true;
    } catch (error) {}
}


drawButtons();
writeOnDisplay(0);

