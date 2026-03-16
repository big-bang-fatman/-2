// بنك الأسئلة المختصر (10 أقسام - سؤال لكل قيمة)
const questionsBank = {
    "قرآن": [{q:"أطول سورة؟",a:"البقرة",v:100},{q:"سورة فيها بسملتين؟",a:"النمل",v:200},{q:"أطول آية؟",a:"الدين",v:300},{q:"صحابي ذكر اسمه؟",a:"زيد بن حارثة",v:400},{q:"أخت الطويلتين؟",a:"الأعراف",v:500}],
    "تاريخ": [{q:"أول خليفة؟",a:"أبو بكر",v:100},{q:"فتح مكة؟",a:"8 هـ",v:200},{q:"الثورة الفرنسية؟",a:"1789م",v:300},{q:"توحيد المملكة؟",a:"1351 هـ",v:400},{q:"عاصمة العباسيين الأولى؟",a:"الكوفة",v:500}],
    "فلك": [{q:"أكبر كوكب؟",a:"المشتري",v:100},{q:"كوكب أحمر؟",a:"المريخ",v:200},{q:"وحدة المسافات؟",a:"السنة الضوئية",v:300},{q:"أول إنسان بالفضاء؟",a:"يوري غاغارين",v:400},{q:"مذنب يظهر كل 76 عام؟",a:"هالي",v:500}],
    "علوم": [{q:"رمز الماء؟",a:"H2O",v:100},{q:"أصلب مادة؟",a:"الألماس",v:200},{q:"عظام البالغ؟",a:"206",v:300},{q:"غاز التنفس؟",a:"أكسجين",v:400},{q:"المعطي العام؟",a:"O-",v:500}],
    "حيوانات": [{q:"أسرع حيوان؟",a:"الفهد",v:100},{q:"يغير لونه؟",a:"الحرباء",v:200},{q:"أطول رقبة؟",a:"الزرافة",v:300},{q:"أصغر طائر؟",a:"الطنان",v:400},{q:"أقوى عضة؟",a:"التمساح",v:500}],
    "جغرافيا": [{q:"أكبر قارة؟",a:"آسيا",v:100},{q:"أطول نهر؟",a:"النيل",v:200},{q:"عاصمة اليابان؟",a:"طوكيو",v:300},{q:"مضيق هرمز يربط؟",a:"عمان بالخليج",v:400},{q:"أكبر جزيرة؟",a:"جرينلاند",v:500}],
    "رياضة": [{q:"لاعبين القدم؟",a:"11",v:100},{q:"أول كأس عالم؟",a:"الأوروغواي",v:200},{q:"مسافة الماراثون؟",a:"42 كم",v:300},{q:"لقب ميسي؟",a:"البرغوث",v:400},{q:"حلقات الأولمبياد؟",a:"5",v:500}],
    "أدب": [{q:"شاعر الرسول؟",a:"حسان بن ثابت",v:100},{q:"أمير الشعراء؟",a:"أحمد شوقي",v:200},{q:"كاتب البؤساء؟",a:"فيكتور هوجو",v:300},{q:"اسم المتنبي؟",a:"أحمد بن الحسين",v:400},{q:"كتاب الحيوان؟",a:"الجاحظ",v:500}],
    "اختراعات": [{q:"المصباح؟",a:"إديسون",v:100},{q:"الهاتف؟",a:"غراهام بيل",v:200},{q:"الطائرة؟",a:"الرايت",v:300},{q:"الراديو؟",a:"ماركوني",v:400},{q:"المحرك البخاري؟",a:"جيمس واط",v:500}],
    "عامة": [{q:"لون الزمرد؟",a:"أخضر",v:100},{q:"صوت الأسد؟",a:"زئير",v:200},{q:"عملة بريطانيا؟",a:"جنيه",v:300},{q:"أقرب كوكب؟",a:"الزهرة",v:400},{q:"أكبر محيط؟",a:"الهادي",v:500}]
};

let scores = [0, 0], currentTurn = 0, usedCategories = [], tempSelected = [];
let perksStatus = {
    0: { double: true, wheel: true, half: true },
    1: { double: true, wheel: true, half: true }
};
let activePerk = null, questionsLeft = 0, deletedCount = 0;
let activeCard, activeVal;

// إدارة المزايا
function usePerk(type) {
    if (!perksStatus[currentTurn][type]) return;
    
    // إلغاء تفعيل أي ميزة سابقة قبل اختيار الجديدة
    activePerk = type;
    document.querySelectorAll(`.team-box:nth-child(${currentTurn === 0 ? 1 : 3}) .perk-btn`).forEach(btn => {
        btn.classList.remove('active-perk');
    });
    
    const btnId = `${type}${currentTurn + 1}`;
    document.getElementById(btnId).classList.add('active-perk');
}

// بدء المسابقة وحفظ الأسماء
function saveNamesAndStart() {
    document.getElementById('name1-display').innerText = document.getElementById('name-team1').value || "الفريق 1";
    document.getElementById('name2-display').innerText = document.getElementById('name-team2').value || "الفريق 2";
    showCategorySelection();
}

function showCategorySelection() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('main-game').style.display = 'none';
    document.getElementById('category-selection-screen').classList.remove('hidden');
    
    const list = document.getElementById('categories-list');
    list.innerHTML = '';
    tempSelected = [];

    Object.keys(questionsBank).forEach(cat => {
        const played = usedCategories.includes(cat);
        const div = document.createElement('div');
        div.className = 'category-item' + (played ? ' played' : '');
        div.innerText = cat;
        if(!played) {
            div.onclick = () => {
                if(tempSelected.includes(cat)) {
                    tempSelected = tempSelected.filter(c => c!==cat);
                    div.classList.remove('selected');
                } else if(tempSelected.length < 5) {
                    tempSelected.push(cat);
                    div.classList.add('selected');
                }
                document.getElementById('start-round-btn').disabled = tempSelected.length !== 5;
            };
        }
        list.appendChild(div);
    });
}

function confirmCategories() {
    usedCategories.push(...tempSelected);
    questionsLeft = tempSelected.length * 5;
    if(usedCategories.length > 5) deletedCount = 3; // تفعيل الحذف للجولة الثانية

    document.getElementById('category-selection-screen').classList.add('hidden');
    document.getElementById('main-game').style.display = 'block';
    renderBoard();
    updateUI();
}

function renderBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    tempSelected.forEach(cat => {
        const col = document.createElement('div');
        col.className = 'genre-column';
        col.innerHTML = `<div class="genre-title">${cat}</div>`;
        [100, 200, 300, 400, 500].forEach(v => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerText = v;
            
            if(v === 500 && deletedCount > 0) {
                card.classList.add('disabled'); card.innerText = "🗑️";
                questionsLeft--; deletedCount--;
            } else {
                card.onclick = () => openQuestion(cat, v, card);
            }
            col.appendChild(card);
        });
        board.appendChild(col);
    });
}

function openQuestion(cat, v, card) {
    activeCard = card; activeVal = v;
    let q = questionsBank[cat].find(x => x.v === v);
    document.getElementById('modal-q-text').innerText = q.q;
    document.getElementById('modal-ans-text').innerText = q.a;
    document.getElementById('modal-ans-text').style.display = 'none';
    document.getElementById('modal-btns').style.display = 'block';
    document.getElementById('q-modal').style.display = 'flex';
}

function handleResult(isCorrect) {
    let finalVal = activeVal;
    if(activePerk === 'double') finalVal *= 2;
    if(activePerk === 'half') finalVal *= 0.5;
    if(activePerk === 'wheel') finalVal = Math.random() > 0.5 ? finalVal * 2 : 0;

    if(isCorrect) scores[currentTurn] += finalVal;
    else scores[currentTurn] -= finalVal;

    // استهلاك الميزة
    if(activePerk) {
        const btnId = `${activePerk}${currentTurn + 1}`;
        const btn = document.getElementById(btnId);
        btn.classList.remove('active-perk');
        btn.classList.add('used');
        perksStatus[currentTurn][activePerk] = false;
        activePerk = null;
    }

    document.getElementById('modal-ans-text').style.display = 'block';
    document.getElementById('modal-btns').style.display = 'none';
    
    setTimeout(() => {
        document.getElementById('q-modal').style.display = 'none';
        activeCard.classList.add('disabled');
        activeCard.onclick = null;
        questionsLeft--;
        
        if(questionsLeft <= 0) {
            alert("انتهت الجولة! ننتقل لاختيار الأقسام المتبقية.");
            showCategorySelection();
        } else {
            currentTurn = (currentTurn === 0 ? 1 : 0);
            updateUI();
        }
    }, 2000);
}

function updateUI() {
    document.getElementById('score1').innerText = scores[0];
    document.getElementById('score2').innerText = scores[1];
    document.getElementById('team1-ui').classList.toggle('active', currentTurn === 0);
    document.getElementById('team2-ui').classList.toggle('active', currentTurn === 1);
}

// دوال القائمة
function toggleMenu() { document.getElementById('side-menu').classList.toggle('active'); }
function restartGame() { location.reload(); }
function showInstructions() { alert("1. اختر 5 أقسام.\n2. لكل فريق 3 مزايا تستخدم مرة واحدة.\n3. الجولة 2 تبدأ تلقائياً."); }
