const questionsBank = {
    "قرآن": [{q:"أطول سورة؟",a:"البقرة",v:100},{q:"سورة فيها بسملتين؟",a:"النمل",v:200},{q:"أطول آية؟",a:"الدين",v:300},{q:"صحابي ذكر اسمه؟",a:"زيد",v:400},{q:"أخت الطويلتين؟",a:"الأعراف",v:500}],
    "تاريخ": [{q:"أول خليفة؟",a:"أبو بكر",v:100},{q:"فتح مكة؟",a:"8 هـ",v:200},{q:"الثورة الفرنسية؟",a:"1789",v:300},{q:"توحيد المملكة؟",a:"1351",v:400},{q:"عاصمة العباسيين الأولى؟",a:"الكوفة",v:500}],
    "فلك": [{q:"أكبر كوكب؟",a:"المشتري",v:100},{q:"كوكب أحمر؟",a:"المريخ",v:200},{q:"وحدة المسافات؟",a:"السنة الضوئية",v:300},{q:"أول بشري بالفضاء؟",a:"يوري",v:400},{q:"مذنب 76 عام؟",a:"هالي",v:500}],
    "علوم": [{q:"رمز الماء؟",a:"H2O",v:100},{q:"أصلب مادة؟",a:"الألماس",v:200},{q:"عظام البالغ؟",a:"206",v:300},{q:"غاز التنفس؟",a:"أكسجين",v:400},{q:"المعطي العام؟",a:"O-",v:500}],
    "حيوانات": [{q:"أسرع حيوان؟",a:"الفهد",v:100},{q:"يغير لونه؟",a:"الحرباء",v:200},{q:"أطول رقبة؟",a:"الزرافة",v:300},{q:"أصغر طائر؟",a:"الطنان",v:400},{q:"أقوى عضة؟",a:"التمساح",v:500}],
    "جغرافيا": [{q:"أكبر قارة؟",a:"آسيا",v:100},{q:"أطول نهر؟",a:"النيل",v:200},{q:"عاصمة اليابان؟",a:"طوكيو",v:300},{q:"مضيق هرمز يربط؟",a:"عمان بالخليج",v:400},{q:"أكبر جزيرة؟",a:"جرينلاند",v:500}],
    "رياضة": [{q:"لاعبين القدم؟",a:"11",v:100},{q:"أول كأس عالم؟",a:"الأوروغواي",v:200},{q:"مسافة الماراثون؟",a:"42",v:300},{q:"لقب ميسي؟",a:"البرغوث",v:400},{q:"حلقات الأولمبياد؟",a:"5",v:500}],
    "أدب": [{q:"شاعر الرسول؟",a:"حسان",v:100},{q:"أمير الشعراء؟",a:"أحمد شوقي",v:200},{q:"كاتب البؤسا؟",a:"فيكتور",v:300},{q:"اسم المتنبي؟",a:"أحمد",v:400},{q:"كتاب الحيوان؟",a:"الجاحظ",v:500}],
    "اختراعات": [{q:"المصباح؟",a:"إديسون",v:100},{q:"الهاتف؟",a:"بيل",v:200},{q:"الطائرة؟",a:"الرايت",v:300},{q:"الراديو؟",a:"ماركوني",v:400},{q:"محرك بخاري؟",a:"واط",v:500}],
    "عامة": [{q:"لون الزمرد؟",a:"أخضر",v:100},{q:"صوت الأسد؟",a:"زئير",v:200},{q:"عملة بريطانيا؟",a:"جنيه",v:300},{q:"أقرب كوكب؟",a:"الزهرة",v:400},{q:"أكبر محيط؟",a:"الهادي",v:500}]
};

let scores = [0, 0], currentTurn = 0, usedCats = [], tempCats = [];
let perks = [ {double:true, wheel:true, half:true}, {double:true, wheel:true, half:true} ];
let activePerk = null, activeVal = 0, activeCard = null, questionsLeft = 0, deleted = 0;

// نظام الصوت لضمان العمل
function playSound(freq) {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.frequency.value = freq; osc.start();
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    osc.stop(ctx.currentTime + 0.5);
}

function startGame() {
    document.getElementById('display-name0').innerText = document.getElementById('name-team1').value || "الفريق 1";
    document.getElementById('display-name1').innerText = document.getElementById('name-team2').value || "الفريق 2";
    showCatSelect();
}

function showCatSelect() {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById('category-screen').classList.remove('hidden');
    const list = document.getElementById('categories-list');
    list.innerHTML = ''; tempCats = [];
    Object.keys(questionsBank).forEach(cat => {
        const played = usedCats.includes(cat);
        const div = document.createElement('div');
        div.className = 'category-item ' + (played ? 'played' : '');
        div.innerText = cat;
        if(!played) {
            div.onclick = () => {
                if(tempCats.includes(cat)) { tempCats = tempCats.filter(c => c!==cat); div.style.background="#1e293b"; }
                else if(tempCats.length < 5) { tempCats.push(cat); div.style.background="#3b82f6"; }
                document.getElementById('confirm-cats-btn').disabled = tempCats.length !== 5;
            };
        }
        list.appendChild(div);
    });
}

function startRound() {
    usedCats.push(...tempCats);
    questionsLeft = 25;
    if(usedCats.length > 5) deleted = 3;
    document.getElementById('category-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    renderBoard(); updateUI();
}

function renderBoard() {
    const board = document.getElementById('board'); board.innerHTML = '';
    tempCats.forEach(cat => {
        const col = document.createElement('div'); col.innerHTML = `<b>${cat}</b>`;
        [100, 200, 300, 400, 500].forEach(v => {
            const card = document.createElement('div'); card.className = 'card'; card.innerText = v;
            if(v === 500 && deleted > 0) { card.classList.add('disabled'); card.innerText = "🗑️"; deleted--; questionsLeft--; }
            else { card.onclick = () => openQ(cat, v, card); }
            col.appendChild(card);
        });
        board.appendChild(col);
    });
}

function openQ(cat, v, card) {
    playSound(440); activeCard = card; activeVal = v;
    const q = questionsBank[cat].find(x => x.v === v);
    document.getElementById('modal-q').innerText = q.q;
    document.getElementById('modal-a').innerText = "الإجابة: " + q.a;
    document.getElementById('modal-a').classList.add('hidden');
    document.getElementById('ans-btns').classList.remove('hidden');
    document.getElementById('modal').classList.remove('hidden');
}

function activatePerk(p) {
    if(!perks[currentTurn][p]) return;
    activePerk = p;
    document.querySelectorAll('.perks-row button').forEach(b => b.classList.remove('active-perk'));
    document.getElementById(p + currentTurn).classList.add('active-perk');
}

function checkResult(isCorrect) {
    let val = activeVal;
    if(activePerk === 'double') val *= 2;
    if(activePerk === 'half') val *= 0.5;
    if(activePerk === 'wheel') val = Math.random() > 0.5 ? val * 2 : 0;

    if(isCorrect) { scores[currentTurn] += val; playSound(880); }
    else { scores[currentTurn] -= val; playSound(220); }

    if(activePerk) {
        const btn = document.getElementById(activePerk + currentTurn);
        btn.classList.add('used'); perks[currentTurn][activePerk] = false; activePerk = null;
    }

    document.getElementById('ans-btns').classList.add('hidden');
    document.getElementById('modal-a').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('modal').classList.add('hidden');
        activeCard.classList.add('disabled'); questionsLeft--;
        if(questionsLeft <= 0) { alert("انتهت الجولة!"); showCatSelect(); }
        else { currentTurn = (currentTurn === 0 ? 1 : 0); updateUI(); }
    }, 2000);
}

function updateUI() {
    document.getElementById('score0').innerText = scores[0];
    document.getElementById('score1').innerText = scores[1];
    document.getElementById('team0-area').classList.toggle('active', currentTurn === 0);
    document.getElementById('team1-area').classList.toggle('active', currentTurn === 1);
}

function toggleMenu() { document.getElementById('side-menu').classList.toggle('active'); }
function restartGame() { location.reload(); }
function showInstructions() { alert("تحدي المعلومات: اختر 5 تصانيف، استخدم المزايا لتغيير النقاط. الفائز بالجولة الأولى يحذف 3 أسئلة في الثانية."); }
