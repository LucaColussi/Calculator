let display = document.querySelector(".display");
let pi = document.createElement("p");


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
                    <img src="/images/gitIcon.png" alt="GitHub" style="width: 40px; height: 40px;">
            `;
        } else {
            bt.innerHTML = buttons[i];
        }
        bt.id = buttons[i];
        bt.onclick = function() {
            writeOnDisplay(buttons[i]);
        };
        

        if (i % 5 < 3) {
            bt.style.backgroundColor = "#2a2a2c"; // Cambia il colore di sfondo (per esempio blu chiaro)
        }

        if (i === 3 || i === 8 || i === 13) {
            bt.style.backgroundColor = "#5c5c5f"; // Cambia il colore di sfondo (per esempio giallo oro)
        }
        
        cont.appendChild(bt);
    }
}

function writeOnDisplay(value) {
    console.log(value);
    if(pi.textContent === "0" && value !== "+" && value !== "/" && value !== "*" && value !== "%") {
        pi.innerHTML = ""; // Svuota il contenitore
    }
    if(value === "git") {
        window.open("https://github.com/LucaColussi");
    }    
    else if(value === "=") {
        evaluate(pi.textContent);
    }
    else if(value === "AC") {
        erase();
    } 
    else if(value === "+/-"){
        console.log("lavori in corso...");
    }
    else if(value === ","){
        if(!isPresent(pi.textContent)) {
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
    display.appendChild(pi);
}

function write(text) {
    pi.textContent += text;
}

function erase() {
    pi.innerText = "0";
}

function isPresent(exp) {
    if(exp.includes(",")) return true;
    return false;
}

function isNear(exp) {
    const operators = ['+', '-', '*', '/', '%'];
    if(operators.includes(exp.slice(-1))) return true;
    return false;
}

function evaluate(exp) {
    erase();
    console.log(exp);
}

drawButtons();
writeOnDisplay(0);

