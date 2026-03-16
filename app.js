// 1. بنك الأسئلة (10 أقسام - سؤال واحد لكل قيمة)
const questionsBank = {
    "قرآن": [
        { q: "ما هي أطول سورة في القرآن الكريم؟", a: "سورة البقرة", v: 100 },
        { q: "سورة ذكرت فيها البسملة مرتين؟", a: "سورة النمل", v: 200 },
        { q: "ما هي أطول آية في القرآن الكريم؟", a: "آية الدين", v: 300 },
        { q: "الصحابي الوحيد الذي ذكر اسمه في القرآن؟", a: "زيد بن حارثة", v: 400 },
        { q: "سورة تسمى 'أخت الطويلتين'؟", a: "سورة الأعراف", v: 500 }
    ],
    "تاريخ": [
        { q: "من هو أول خليفة للمسلمين؟", a: "أبو بكر الصديق", v: 100 },
        { q: "في أي عام تم فتح مكة؟", a: "8 هجري", v: 200 },
        { q: "متى قامت الثورة الفرنسية؟", a: "1789م", v: 300 },
        { q: "متى تم توحيد المملكة العربية السعودية؟", a: "1351 هـ", v: 400 },
        { q: "أول عاصمة للدولة العباسية قبل بغداد؟", a: "الكوفة", v: 500 }
    ],
    "فلك": [
        { q: "ما هو أكبر كوكب في المجموعة الشمسية؟", a: "المشتري", v: 100 },
        { q: "كم يستغرق ضوء الشمس للوصول للأرض؟", a: "8 دقائق و20 ثانية", v: 200 },
        { q: "وحدة قياس المسافات بين النجوم؟", a: "السنة الضوئية", v: 300 },
        { q: "من هو أول إنسان صعد إلى الفضاء؟", a: "يوري غاغارين", v: 400 },
        { q: "المذنب الذي يظهر كل 76 عاماً؟", a: "مذنب هالي", v: 500 }
    ],
    "علوم": [
        { q: "ما هو الرمز الكيميائي للماء؟", a: "H2O", v: 100 },
        { q: "أصلب مادة طبيعية في الأرض؟", a: "الألماس", v: 200 },
        { q: "كم عدد عظام جسم الإنسان البالغ؟", a: "206 عظمة", v: 300 },
        { q: "أكثر غاز متوفر في الهواء الجوي؟", a: "النيتروجين", v: 400 },
        { q: "فصيلة دم تسمى 'المعطي العام'؟", a: "O-", v: 500 }
    ],
    "حيوانات": [
        { q: "ما هو أسرع حيوان بري في العالم؟", a: "الفهد (الشيتا)", v: 100 },
        { q: "ما هو الحيوان الذي يغير لونه للتخفي؟", a: "الحرباء", v: 200 },
        { q: "ما هو الحيوان الذي له أطول رقبة؟", a: "الزرافة", v: 300 },
        { q: "ما هو أصغر طائر في العالم؟", a: "طائر الطنان", v: 400 },
        { q: "حيوان لديه أقوى عضة في العالم؟", a: "التمساح", v: 500 }
    ],
    "جغرافيا": [
        { q: "ما هي أكبر قارة في العالم؟", a: "آسيا", v: 100 },
        { q: "ما هو أطول نهر في العالم؟", a: "نهر النيل", v: 200 },
        { q: "ما هي عاصمة اليابان؟", a: "طوكيو", v: 300 },
        { q: "أين يقع مضيق هرمز؟", a: "بين الخليج العربي وخليج عمان", v: 400 },
        { q: "ما هي الدولة التي تملك أكبر عدد سكان؟", a: "الهند (حالياً)", v: 500 }
    ],
    "رياضة": [
        { q: "كم عدد لاعبي فريق كرة القدم؟", a: "11 لاعب", v: 100 },
        { q: "في أي بلد أقيم أول كأس عالم؟", a: "الأوروغواي", v: 200 },
        { q: "ما هو طول ماراثون الجري؟", a: "42.195 كم", v: 300 },
        { q: "من هو اللاعب الملقب بالبرغوث؟", a: "ليونيل ميسي", v: 400 },
        { q: "كم عدد حلقات العلم الأولمبي؟", a: "5 حلقات", v: 500 }
    ],
    "أدب": [
        { q: "من هو شاعر الرسول ﷺ؟", a: "حسان بن ثابت", v: 100 },
        { q: "ما هو لقب الشاعر أحمد شوقي؟", a: "أمير الشعراء", v: 200 },
        { q: "من هو كاتب رواية البؤساء؟", a: "فيكتور هوجو", v: 300 },
        { q: "ما هو الاسم الحقيقي للمتنبي؟", a: "أحمد بن الحسين", v: 400 },
        { q: "من هو صاحب كتاب 'الحيوان'؟", a: "الجاحظ", v: 500 }
    ],
    "اختراعات": [
        { q: "من هو مخترع المصباح الكهربائي؟", a: "توماس إديسون", v: 100 },
        { q: "من هو مخترع الهاتف؟", a: "ألكسندر غراهام بيل", v: 200 },
        { q: "من هو مخترع الطائرة؟", a: "الأخوان رايت", v: 300 },
        { q: "من هو مخترع الراديو؟", a: "ماركوني", v: 400 },
        { q: "من هو مخترع المحرك البخاري؟", a: "جيمس واط", v: 500 }
    ],
    "معلومات عامة": [
        { q: "ما هو لون الزمرد؟", a: "أخضر", v: 100 },
        { q: "ما هو صوت الأسد؟", a: "زئير", v: 200 },
        { q: "ما هي العملة الرسمية في بريطانيا؟", a: "الجنيه الإسترليني", v: 300 },
        { q: "ما هو أقرب كوكب للأرض؟", a: "الزهرة", v: 400 },
        { q: "ما هي أكبر جزيرة في العالم؟", a: "جرينلاند", v: 500 }
    ]
};

// 2. نظام الصوت
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSnd(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    if (type==='correct') { osc.frequency.setValueAtTime(523, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime+0.2); }
    else if (type==='wrong') { osc.type='sawtooth'; osc.frequency.setValueAtTime(150, audioCtx.currentTime); }
    else if (type==='open') { osc.type='triangle'; osc.frequency.setValueAtTime(440, audioCtx.currentTime); }
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime); osc.start(); osc.stop(audioCtx.currentTime+0.2);
}

// 3. الحالة والمنطق
let scores = [0, 0];
let currentTurn = 0;
let usedCategories = [];
let perks = { mute: [true, true] };
let activeCard, activeVal, activeGenre, isStolenMode = false;
let deletedCount = 0;

function toggleMenu() { document.getElementById('side-menu').classList.toggle('active'); }

function saveNamesAndStart() {
    const n1 = document.getElementById('name-team1').value || "الفريق الأول";
    const n2 = document.getElementById('name-team2').value || "الفريق الثاني";
    document.getElementById('display-name1').innerText = n1;
    document.getElementById('display-name2').innerText = n2;
    showCategorySelection();
}

function showCategorySelection() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('main-game').classList.add('hidden');
    document.getElementById('category-selection-screen').classList.remove('hidden');
    
    // ميزة الحذف تظهر فقط إذا كانت هناك جولة سابقة
    if (usedCategories.length > 0) {
        document.getElementById('delete-perk-area').classList.remove('hidden');
        const winner = scores[0] >= scores[1] ? document.getElementById('display-name1').innerText : document.getElementById('display-name2').innerText;
        document.getElementById('winner-msg').innerText = `المتصدر: ${winner} (له حق حذف 3 أسئلة)`;
        document.getElementById('btn-apply-delete').disabled = false;
    }

    const list = document.getElementById('categories-list');
    list.innerHTML = '';
    let selected = [];
    
    Object.keys(questionsBank).forEach(cat => {
        const played = usedCategories.includes(cat);
        const div = document.createElement('div');
        div.className = 'category-item' + (played ? ' played' : '');
        div.innerText = cat + (played ? ' (تم لعبها)' : '');
        
        if (!played) {
            div.onclick = () => {
                if(selected.includes(cat)) {
                    selected = selected.filter(c => c!==cat);
                    div.classList.remove('selected');
                } else if(selected.length < 5) {
                    selected.push(cat);
                    div.classList.add('selected');
                }
                document.getElementById('selected-count').innerText = selected.length;
                document.getElementById('start-round-btn').disabled = selected.length !== 5;
            };
        }
        list.appendChild(div);
    });
    window.tempSelected = selected;
}

function applyDeletePerk() {
    deletedCount = 3;
    alert("سيتم حذف 3 أسئلة من فئة 500 في هذه الجولة!");
    document.getElementById('btn-apply-delete').disabled = true;
}

function confirmCategories() {
    usedCategories.push(...window.tempSelected);
    document.getElementById('category-selection-screen').classList.add('hidden');
    document.getElementById('main-game').classList.remove('hidden');
    renderBoard();
}

function renderBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    window.tempSelected.forEach(cat => {
        const col = document.createElement('div');
        col.className = 'genre-column';
        col.innerHTML = `<div class="genre-title">${cat}</div>`;
        [100, 200, 300, 400, 500].forEach(v => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerText = v;
            
            // تطبيق حذف الأسئلة للمتصدر
            if (v === 500 && deletedCount > 0 && Math.random() > 0.4) {
                card.classList.add('disabled');
                card.innerText = "🗑️";
                deletedCount--;
            } else {
                card.onclick = () => openQuestion(cat, v, card);
            }
            col.appendChild(card);
        });
        board.appendChild(col);
    });
}

function openQuestion(cat, v, card) {
    playSnd('open');
    activeCard = card; activeVal = v; activeGenre = cat; isStolenMode = false;
    document.getElementById('modal-genre').innerText = `${cat} - ${v}`;
    let q = questionsBank[cat].find(x => x.v === v);
    document.getElementById('modal-question-text').innerText = q.q;
    document.getElementById('modal-answer').innerText = q.a;
    
    document.getElementById('modal-answer').classList.add('hidden');
    document.getElementById('decision-section').classList.remove('hidden');
    document.getElementById('steal-section').classList.add('hidden');
    document.getElementById('question-modal').classList.remove('hidden');
}

function handleResult(isCorrect) {
    if(isCorrect) {
        playSnd('correct');
        scores[currentTurn] += activeVal;
        document.getElementById('modal-answer').classList.remove('hidden');
        document.getElementById('decision-section').classList.add('hidden');
        setTimeout(finalize, 2000);
    } else {
        playSnd('wrong');
        scores[currentTurn] -= activeVal;
        document.getElementById('decision-section').classList.add('hidden');
        if(!isStolenMode) document.getElementById('steal-section').classList.remove('hidden');
        else { 
            document.getElementById('modal-answer').classList.remove('hidden'); 
            setTimeout(finalize, 2000); 
        }
    }
    updateUI();
}

function handleSteal(wants) {
    document.getElementById('steal-section').classList.add('hidden');
    if(wants) {
        currentTurn = (currentTurn === 0 ? 1 : 0);
        isStolenMode = true;
        document.getElementById('decision-section').classList.remove('hidden');
        updateUI();
    } else {
        document.getElementById('modal-answer').classList.remove('hidden');
        setTimeout(finalize, 2000);
    }
}

function manualAdjust(team, amt) {
    scores[team] += amt;
    updateUI();
}

function usePerk(type, team) {
    if (type==='mute' && perks.mute[team]) {
        alert("تم تفعيل ميزة التسكيت!");
        perks.mute[team] = false;
        document.getElementById(`mute-p${team+1}`).classList.add('disabled');
        document.getElementById(`mute-p${team+1}`).disabled = true;
    }
}

function finalize() {
    activeCard.classList.add('disabled');
    activeCard.onclick = null;
    document.getElementById('question-modal').classList.add('hidden');
    currentTurn = (currentTurn === 0 ? 1 : 0);
    updateUI();
}

function updateUI() {
    document.getElementById('score1').innerText = scores[0];
    document.getElementById('score2').innerText = scores[1];
    document.getElementById('team1-box').classList.toggle('active', currentTurn === 0);
    document.getElementById('team2-box').classList.toggle('active', currentTurn === 1);
}
