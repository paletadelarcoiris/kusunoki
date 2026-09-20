// 素材画像（SVG）
const svgAssets = {
    crust: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="%23e0a96d"/><circle cx="100" cy="100" r="82" fill="%23f4d068"/><circle cx="100" cy="100" r="76" fill="%23d32f2f"/><circle cx="100" cy="100" r="72" fill="%23fff3e0"/></svg>',
    sausage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="%23a04000"/><circle cx="25" cy="25" r="15" fill="%23d35400"/><circle cx="20" cy="20" r="3" fill="%23edbb99"/></svg>',
    cheese: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M10,40 Q25,10 40,40 Q25,35 10,40" fill="%23f1c40f"/></svg>',
    bacon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M5,15 C15,5 25,25 45,15 L45,30 C25,40 15,20 5,30 Z" fill="%23c0392b"/></svg>',
    onion: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M10,25 A15,15 0 0,1 40,25" stroke="%238e44ad" stroke-width="8" fill="none" stroke-linecap="round"/></svg>',
    egg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><ellipse cx="25" cy="25" rx="20" ry="16" fill="%23ffffff"/><circle cx="25" cy="25" r="8" fill="%23f39c12"/></svg>',
    chicken: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M10,20 Q25,5 40,20 Q35,40 15,35 Z" fill="%23d5f5e3" stroke="%2327ae60" stroke-width="2"/></svg>',
    shrimp: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M10,35 Q10,10 35,10 Q40,25 25,35 Q15,35 10,35" fill="%23e74c3c"/></svg>',
    tomato: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="%23e74c3c"/><circle cx="25" cy="25" r="12" fill="%23c0392b"/><circle cx="20" cy="20" r="3" fill="%23f9e79f"/><circle cx="30" cy="28" r="3" fill="%23f9e79f"/></svg>',
    mushroom: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M10,25 A15,15 0 0,1 40,25 Z" fill="%23d5dbdb"/><rect x="20" y="25" width="10" height="15" fill="%23bdc3c7"/></svg>',
    corn: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><ellipse cx="25" cy="25" rx="8" ry="12" fill="%23f1c40f"/></svg>',
    pepper: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><rect x="10" y="15" width="30" height="20" rx="10" fill="none" stroke="%2327ae60" stroke-width="6"/></svg>',
    salami: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="%23922b21"/><circle cx="18" cy="18" r="2" fill="%23fadbd8"/><circle cx="30" cy="22" r="2" fill="%23fadbd8"/><circle cx="22" cy="30" r="2" fill="%23fadbd8"/></svg>'
};

const toppingsList = [
    { name: 'Sausage', src: svgAssets.sausage },
    { name: 'Cheese', src: svgAssets.cheese },
    { name: 'Bacon', src: svgAssets.bacon },
    { name: 'Onion', src: svgAssets.onion },
    { name: 'Fried Egg', src: svgAssets.egg },
    { name: 'Chicken', src: svgAssets.chicken },
    { name: 'Shrimp', src: svgAssets.shrimp },
    { name: 'Tomato', src: svgAssets.tomato },
    { name: 'Mushroom', src: svgAssets.mushroom },
    { name: 'Corn', src: svgAssets.corn },
    { name: 'Pepper', src: svgAssets.pepper },
    { name: 'Salami', src: svgAssets.salami }
];

let selectedTopping = null;
let qrObj = null;

// 画面読み込み時の初期化処理
window.addEventListener('DOMContentLoaded', () => {
    const crustEl = document.getElementById('pizzaCrust');
    if (crustEl) crustEl.style.backgroundImage = `url('${svgAssets.crust}')`;

    const toppingBox = document.getElementById('toppingBox');
    if (toppingBox) {
        toppingBox.innerHTML = '';
        toppingsList.forEach(t => {
            const item = document.createElement('div');
            item.className = 'topping-item';
            item.setAttribute('data-src', t.src);
            item.innerHTML = `<img src="${t.src}"><div class="topping-name">${t.name}</div>`;
            
            item.addEventListener('mousedown', (e) => initCreate(e, t.src, false));
            item.addEventListener('touchstart', (e) => initCreate(e, t.src, true), { passive: false });
            toppingBox.appendChild(item);
        });
    }

    const editor = document.getElementById('dialogueText');
    if (editor) {
        editor.innerHTML = '<div><font color="#888888" size="5">A: What do you like?</font></div>' +
                           '<div><font color="#1e88e5" size="5">B: I like sausage and corn.</font></div>' +
                           '<div><br></div>' +
                           '<div><font color="#888888" size="5">A: How many?</font></div>' +
                           '<div><font color="#43a047" size="5">B: Three, please.</font></div>';
    }

    checkIncomingQRData();
    setTimeout(initQR, 200); // DOMレンダリング後に安全にQRを初期化
});

// --- QRコード機能（確実な描画と不具合修正） ---
function initQR() {
    const qrContainer = document.getElementById('qrcode');
    if (!qrContainer) return;
    qrContainer.innerHTML = '';
    
    const editor = document.getElementById('dialogueText');
    const textContent = editor ? (editor.innerText || editor.textContent) : '';
    const shareUrl = generateShareURL(textContent);

    if (window.QRCode) {
        try {
            qrObj = new QRCode(qrContainer, {
                text: shareUrl,
                width: 80,
                height: 80,
                correctLevel: QRCode.CorrectLevel.L
            });
            return;
        } catch (e) {
            console.warn("QRCode library error, fallback used:", e);
        }
    }
    
    // ライブラリなし・エラー時のフォールバック表示
    renderFallbackQR(qrContainer, shareUrl);
}

function generateQR() {
    const editor = document.getElementById('dialogueText');
    const textContent = editor ? (editor.innerText || editor.textContent) : '';
    const shareUrl = generateShareURL(textContent);
    
    if (qrObj && typeof qrObj.makeCode === 'function') {
        try {
            qrObj.clear();
            qrObj.makeCode(shareUrl);
        } catch(e) {
            initQR();
        }
    } else {
        initQR();
    }
}

function renderFallbackQR(container, text) {
    container.innerHTML = '';
    const img = document.createElement('img');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(text)}`;
    img.style.width = '80px';
    img.style.height = '80px';
    container.appendChild(img);
}

function generateShareURL(plainText) {
    const baseUrl = window.location.href.split('?')[0];
    const encodedData = encodeURIComponent(plainText);
    return `${baseUrl}?text=${encodedData}`;
}

function checkIncomingQRData() {
    const urlParams = new URLSearchParams(window.location.search);
    const textData = urlParams.get('text');
    if (textData) {
        const editor = document.getElementById('dialogueText');
        if (editor) editor.innerText = decodeURIComponent(textData);
        window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
    }
}

// --- エディタ・タイトル操作 ---
function updateTitle() {
    const name = document.getElementById('nameInput').value;
    document.getElementById('titleDisplay').textContent = name ? `${name} さんのピザ` : '＿＿＿ さんのピザ';
}

function formatDoc(cmd, value) {
    document.execCommand(cmd, false, value);
    const editor = document.getElementById('dialogueText');
    if (editor) editor.focus();
    generateQR();
}

// --- トッピングドラッグ操作 ---
function selectTopping(el) {
    if (selectedTopping) selectedTopping.classList.remove('selected');
    selectedTopping = el;
    if (selectedTopping) selectedTopping.classList.add('selected');
}

const canvasEl = document.getElementById('pizzaCanvas');
if (canvasEl) {
    canvasEl.addEventListener('pointerdown', function(e) {
        if (!e.target.classList.contains('placed-topping')) selectTopping(null);
    });
}

function initCreate(e, imgSrc, isTouch) {
    e.preventDefault(); 
    const canvas = document.getElementById('pizzaCanvas');
    const rect = canvas.getBoundingClientRect();
    
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    
    const img = document.createElement('img');
    img.src = imgSrc; 
    img.className = 'placed-topping';
    img.dataset.scale = "1.5"; 
    img.dataset.rotate = "0";
    img.style.left = (clientX - rect.left) + 'px'; 
    img.style.top = (clientY - rect.top) + 'px';

    canvas.appendChild(img);
    selectTopping(img);
    applyTransform(img);
    
    startDragLogic(e, img, isTouch);
}

function applyTransform(img) {
    img.style.transform = `translate(-50%, -50%) scale(${img.dataset.scale}) rotate(${img.dataset.rotate}deg)`;
}

function startDragLogic(e, element, isTouch) {
    selectTopping(element);
    const canvas = document.getElementById('pizzaCanvas');
    
    const moveHandler = (evt) => {
        evt.preventDefault(); 
        const rect = canvas.getBoundingClientRect();
        const clientX = isTouch ? evt.touches[0].clientX : evt.clientX;
        const clientY = isTouch ? evt.touches[0].clientY : evt.clientY;
        element.style.left = (clientX - rect.left) + 'px';
        element.style.top = (clientY - rect.top) + 'px';
    };
    
    const stopHandler = () => {
        if (isTouch) {
            window.removeEventListener('touchmove', moveHandler);
            window.removeEventListener('touchend', stopHandler);
        } else {
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mouseup', stopHandler);
        }
        
        const finalRect = element.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        if (finalRect.left < canvasRect.left || finalRect.right > canvasRect.right ||
            finalRect.top < canvasRect.top || finalRect.bottom > canvasRect.bottom) {
            if (selectedTopping === element) selectTopping(null);
            element.remove();
        }
    };

    if (isTouch) {
        window.addEventListener('touchmove', moveHandler, { passive: false });
        window.addEventListener('touchend', stopHandler);
    } else {
        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mouseup', stopHandler);
    }
}

if (canvasEl) {
    canvasEl.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('placed-topping')) {
            e.preventDefault();
            startDragLogic(e, e.target, false);
        }
    });
    canvasEl.addEventListener('touchstart', (e) => {
        if (e.target.classList.contains('placed-topping')) {
            e.preventDefault();
            startDragLogic(e, e.target, true);
        }
    }, { passive: false });
}

// --- ボタン機能 ---
function changeSelectedSize(amount) {
    if (!selectedTopping) return;
    let currentScale = parseFloat(selectedTopping.dataset.scale) + amount;
    if (currentScale < 0.4) currentScale = 0.4;
    if (currentScale > 2.4) currentScale = 2.4;
    selectedTopping.dataset.scale = currentScale.toFixed(1);
    applyTransform(selectedTopping);
}

function rotateSelected(degree) {
    if (!selectedTopping) return;
    let currentRotate = (parseInt(selectedTopping.dataset.rotate) + degree) % 360;
    selectedTopping.dataset.rotate = currentRotate;
    applyTransform(selectedTopping);
}

function deleteSelected() {
    if (!selectedTopping) return;
    selectedTopping.remove();
    selectedTopping = null;
}

function resetPizza() {
    document.getElementById('nameInput').value = '';
    document.getElementById('titleDisplay').textContent = '＿＿＿ さんのピザ';
    selectTopping(null);
    document.querySelectorAll('.placed-topping').forEach(topping => topping.remove());
}

function savePizza() {
    if (selectedTopping) selectedTopping.classList.remove('selected');
    const name = document.getElementById('nameInput').value || 'pizza';
    const canvas = document.createElement('canvas');
    canvas.width = 550; canvas.height = 620; 
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#333333'; ctx.font = 'bold 26px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(document.getElementById('titleDisplay').textContent, canvas.width / 2, 40);

    const crustImg = new Image();
    crustImg.src = svgAssets.crust;
    crustImg.onload = function() {
        ctx.drawImage(crustImg, 45, 110, 460, 460);
        const toppings = document.querySelectorAll('.placed-topping');
        let loadedCount = 0;

        if (toppings.length === 0) { 
            triggerDownload(canvas, name); 
            if (selectedTopping) selectedTopping.classList.add('selected');
            return; 
        }

        toppings.forEach(topping => {
            const img = new Image();
            img.src = topping.src;
            const x = parseFloat(topping.style.left);
            const y = parseFloat(topping.style.top);
            const scale = parseFloat(topping.dataset.scale || 1.5);
            const rotate = parseInt(topping.dataset.rotate || 0);

            img.onload = function() {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate((rotate * Math.PI) / 180);
                const size = 70 * scale;
                ctx.drawImage(img, -size / 2, -size / 2, size, size);
                ctx.restore();
                
                loadedCount++; 
                if (loadedCount === toppings.length) { 
                    triggerDownload(canvas, name);
                    if (selectedTopping) selectedTopping.classList.add('selected');
                }
            };
        });
    };
}

function triggerDownload(canvas, filename) {
    try {
        const link = document.createElement('a'); 
        link.download = `${filename}_pizza.png`;
        link.href = canvas.toDataURL('image/png'); 
        document.body.appendChild(link);
        link.click(); 
        document.body.removeChild(link);
    } catch (e) {
        alert("保存に失敗しました。");
    }
}
