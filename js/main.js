const btnGenShips = document.querySelector('.btnGenShips');
const containerLeft = document.querySelector ('.containerLeft');
const containerRight = document.querySelector ('.containerRight');
const arrNameShips = ['cruiser', 'frigate', 'boat'];

let arrShipsRed = [];
let arrShipsGrn = [];
// 0name, 1health, 2force, 3energy, 4status, 5number, 6style, 7type

const genArrShips = (el) => {
    for (i=0; i<10; i++) {
        let z
        z = Number(Math.floor(Math.random() * 3));
        if (z === 0) { el[i] = ['Cruiser', 100, 35, 60, 1, 0, '', 1]; } 
        if (z === 1) { el[i] = ['Frigate', 70, 75, 75, 1, 0, '', 2]; } 
        if (z === 2) { el[i] = ['Boat', 30, 15, 250, 1, 0, '', 3]; }
        el[i][5] = i+1; // number of ship
        if (el == arrShipsRed) { el[i][6] = `shipR${i} shipR`; }
        if (el == arrShipsGrn) { el[i][6] = `shipG${i} shipG`; }
    }
}

const genDivShip = (el, el2, el3) => {
    el.forEach (elem => {
        const div = document.createElement('div');
        div.className = elem[6] + ' ' + elem[0] + ' ' + 'ship';
        div.innerHTML = 'Ship No.: ' + elem[5] + ' Type: ' +elem[0] + '<br>';
        div.innerHTML += '<div class="' + el3 + 'Hno' + elem[5] + ' Health' + elem[7] + '" id="' + el3 + 'HP' + elem[5] + '">Health: ' + elem[1] + ' HP</div>';
        div.innerHTML += '<div class="' + el3 + 'Fno' + elem[5] + ' Force' + elem[7] + '">Forse: ' + elem[2] + ' FP</div>';
        div.innerHTML += '<div class="' + el3 + 'Eno' + elem[5] + ' Energy' + elem[7] + '">Energy: ' + elem[3] + ' EP</div>';
        div.innerHTML += '<div class="' + el3 + 'aim' + elem[5]+ ' aim" id="' + el3 + 'aim' + elem[5] + '"></div>';
        el2.appendChild(div);
    })
}

btnGenShips.addEventListener('click', () => {
    genArrShips(arrShipsRed);
    genArrShips(arrShipsGrn);
    genDivShip(arrShipsRed, containerLeft, 'R');
    genDivShip(arrShipsGrn, containerRight, 'G');
    btnGenShips.style.display = 'none';
})

const arrRaim = [];
const arrGaim = [];
for (i=1; i<11; i++) {
    arrRaim.push('Raim'+ i + ' aim');
    arrGaim.push('Gaim'+ i + ' aim');
}

// сформировали массив для проверки на какой прицеп красных кликнули

let Rstep = 0;
let currentFP = 0;
let currentHP = 0;
let currentFPR = 0;
let currentHPR = 0;
let nomshipGRandom = 0;
let nomshipRRandom = 0;
let gameEnd = 0;
let notdeidArrShipsRed = [];
let notdeidArrShipsGrn = [];
let lengthNASR = 0;
let lengthNASG = 0;
let z;
let y;

document.addEventListener('click', e => {
    //console.log(e.target.className);
    arrRaim.forEach(el => {
        if (el === e.target.className &&  Rstep === 0 && arrShipsRed[arrRaim.indexOf(el)][4] === 1 ) {
            y = document.getElementById('Raim' + (arrRaim.indexOf(el)+1));
            y.style.border = '2px solid red';
            Rstep = 1;
            currentFPR = arrShipsRed[arrRaim.indexOf(el)][2];
        }
    })

    arrGaim.forEach(el => {
        if (el === e.target.className &&  Rstep === 1) {
            arrRaim.forEach(el => {
                y = document.getElementById('Raim' + (arrRaim.indexOf(el)+1));
                y.style.border = '2px solid black';
            })

            currentHPR = arrShipsGrn[arrGaim.indexOf(el)][1];
            console.log('Red currentHP:', currentHP);
            console.log('Red currentFP: ', currentFP);
            if (arrShipsGrn[arrGaim.indexOf(el)][4] === 1) {
                const z = document.getElementById('GHP' + (arrGaim.indexOf(el)+1));
                if (currentHPR <= currentFPR) {
                    arrShipsGrn[arrGaim.indexOf(el)][4] = 0;
                    z.style.boxShadow = 'none';
                    z.innerHTML = 'DIED';
                    arrShipsGrn[arrGaim.indexOf(el)][1] = 0;

                    // is game end ?
                    gameEnd = 0;
                    arrShipsGrn.forEach(el => {
                        gameEnd = gameEnd + el[4]; 
                    });
                    if (gameEnd = 0) {
                        alert('You win');
                    };

                } else {
                    currentHPR = currentHPR-currentFPR;
                    let peremHP = currentHPR*150/100;
                    z.style.boxShadow = 'inset ' + peremHP + 'px 0 pink';
                    z.innerHTML = 'Health:' + currentHPR + ' HP';
                    arrShipsGrn[arrGaim.indexOf(el)][1] = currentHPR;
                }
            }

            notdeidArrShipsRed.length = 0;
            notdeidArrShipsRed = arrShipsRed.filter (el => el[4] > 0); 
            lengthNASR = notdeidArrShipsRed.length;
               console.log('notdeidArrShipsRed , lengthNASR', notdeidArrShipsRed, lengthNASR);
            notdeidArrShipsGrn.length = 0;
            notdeidArrShipsGrn = arrShipsGrn.filter (el => el[4] > 0); 
            lengthNASG = notdeidArrShipsGrn.length;
               console.log('notdeidArrShipsGrn , lengthNASG', notdeidArrShipsGrn , lengthNASG);

            if (lengthNASG === 0) {
                alert('YOU WIN');
                return;
            }

            if (lengthNASR === 0) {
                alert('YOU LOST');
                return;
            }

            nomshipRRandom = Number(Math.floor(Math.random() * lengthNASR));
            nomshipGRandom = Number(Math.floor(Math.random() * lengthNASG));
               console.log('nomshipRRandom, nomshipGRandom', nomshipRRandom, nomshipGRandom);

            currentHP = notdeidArrShipsRed[nomshipRRandom][1];
            currentFP = notdeidArrShipsGrn[nomshipGRandom][2];
               console.log('Grn currentHP', currentHP);
               console.log('Grn currentFP', currentFP);

            z = document.getElementById('RHP' + (notdeidArrShipsRed[nomshipRRandom][5]));
               console.log('style red ship RHP of :', notdeidArrShipsRed[nomshipRRandom][5]);

            if (currentHP <= currentFP) {
                arrShipsRed[notdeidArrShipsRed[nomshipRRandom][5]-1][4] = 0;
                z.style.boxShadow = 'none';
                z.innerHTML = 'DIED';
                arrShipsRed[notdeidArrShipsRed[nomshipRRandom][5]-1][1] = 0;
            } else {
                currentHP = currentHP-currentFP;
                let peremHP = currentHP*150/100;
                z.style.boxShadow = 'inset ' + peremHP + 'px 0 pink';
                z.innerHTML = 'Health: ' + currentHP + ' HP';
                arrShipsGrn[notdeidArrShipsRed[nomshipRRandom][5]-1][1] = currentHP;
            }
            console.log('Green ship No :', notdeidArrShipsGrn[nomshipGRandom][5]);
            console.log('Fight Red ship No :', notdeidArrShipsRed[nomshipRRandom][5]);            
            Rstep = 0;
        }
    })
});

// const arrShips = [
//     { 
//         name: arrNameShips[0],  
//         healf: 100,  
//         forse: 35
//     }
// ]

// const showShips = () => {
//     const rootEl = document.createElement('div');
//     arrShips.forEach (el => {
//         const div = document.createElement('div');
//         div.className = 'ship';
//         if(el) {
//             const html = `<div class="ship-bg"> ${el.name} </div>`;
//             div.insertAdjacentHTML('beforeend', html);
//         }
//         rootEl.appendChild(div);
//     })
//     containerLeft.appendChild(rootEl);
// }
// btnGenShips.addEventListener('click', () => {
//     showShips();
// })

            //alert('etap 1');

            // if (arrShipsGrn[arrGaim.indexOf(el)][4] === 1) {
            //     const z = document.getElementById('GHP' + (arrGaim.indexOf(el)+1));
            //     if (currentHP <= currentFP) {
            //         arrShipsGrn[arrGaim.indexOf(el)][4] = 0;
            //         z.style.boxShadow = 'none';
            //         z.innerHTML = 'DIED';
            //         arrShipsGrn[arrGaim.indexOf(el)][1] = 0;
            //     } else {
            //         currentHP = currentHP-currentFP;
            //         let peremHP = currentHP*150/100;
            //         z.style.boxShadow = 'inset ' + peremHP + 'px 0 pink';
            //         z.innerHTML = 'Health:' + currentHP + ' HP';
            //         arrShipsGrn[arrGaim.indexOf(el)][1] = currentHP;
            //     }
            // }