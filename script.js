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
        bt.innerHTML = buttons[i];
        bt.id = buttons[i];
        cont.appendChild(bt);
    }
}

drawButtons();