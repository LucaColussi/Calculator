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
                <a href="https://github.com/LucaColussi" target="_blank">
                    <img src="/images/gitIcon.png" alt="GitHub" style="width: 40px; height: 40px;">
                </a>
            `;
        } else {
            bt.innerHTML = buttons[i];
        }
        bt.id = buttons[i];

        if (i % 5 < 3) {
            bt.style.backgroundColor = "#2a2a2c"; // Cambia il colore di sfondo (per esempio blu chiaro)
        }

        if (i === 3 || i === 8 || i === 13) {
            bt.style.backgroundColor = "#5c5c5f"; // Cambia il colore di sfondo (per esempio giallo oro)
        }
        
        cont.appendChild(bt);
    }
}

drawButtons();