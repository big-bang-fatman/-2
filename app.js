// بنك الأسئلة (10 أقسام - سؤال لكل قيمة)
const questionsBank = {
    "قرآن": [{q:"أطول سورة؟",a:"البقرة",v:100},{q:"سورة ذكرت فيها البسملة مرتين؟",a:"النمل",v:200},{q:"أطول آية؟",a:"الدين",v:300},{q:"صحابي ذكر اسمه؟",a:"زيد بن حارثة",v:400},{q:"أخت الطويلتين؟",a:"الأعراف",v:500}],
    "تاريخ": [{q:"أول خليفة؟",a:"أبو بكر",v:100},{q:"فتح مكة؟",a:"8 هـ",v:200},{q:"الثورة الفرنسية؟",a:"1789م",v:300},{q:"توحيد السعودية؟",a:"1351 هـ",v:400},{q:"عاصمة العباسيين الأولى؟",a:"الكوفة",v:500}],
    "فلك": [{q:"أكبر كوكب؟",a:"المشتري",v:100},{q:"مدة وصول ضوء الشمس؟",a:"8 دقائق",v:200},{q:"وحدة المسافات النجمية؟",a:"السنة الضوئية",v:300},{q:"أول بشري في الفضاء؟",a:"يوري غاغارين",v:400},{q:"مذنب يظهر كل 76 عام؟",a:"هالي",v:500}],
    "علوم": [{q:"رمز الماء؟",a:"H2O",v:100},{q:"أصلب مادة؟",a:"الألماس",v:200},{q:"عدد عظام البالغ؟",a:"206",v:300},{q:"أكثر غاز في الجو؟",a:"النيتروجين",v:400},{q:"المعطي العام؟",a:"O-",v:500}],
    "حيوانات": [{q:"أسرع حيوان؟",a:"الفهد",v:100},{q:"يغير لونه؟",a:"الحرباء",v:200},{q:"أطول رقبة؟",a:"الزرافة",v:300},{q:"أصغر طائر؟",a:"الطنان",v:400},{q:"أقوى عضة؟",a:"التمساح",v:500}],
    "جغرافيا": [{q:"أكبر قارة؟",a:"آسيا",v:100},{q:"أطول نهر؟",a:"النيل",v:200},{q:"عاصمة اليابان؟",a:"طوكيو",v:300},{q:"مضيق يربط الخليج؟",a:"هرمز",v:400},{q:"أكبر جزيرة؟",a:"جرينلاند",v:500}],
    "رياضة": [{q:"عدد لاعبي الكرة؟",a:"11",v:100},{q:"أول بلد استضاف المونديال؟",a:"الأوروغواي",v:200},{q:"مسافة الماراثون؟",a:"42 كم",v:300},{q:"لقب ميسي؟",a:"البرغوث",v:400},{q:"عدد حلقات الأولمبياد؟",a:"5",v:500}],
    "أدب": [{q:"شاعر الرسول؟",a:"حسان بن ثابت",v:100},{q:"أمير الشعراء؟",a:"أحمد شوقي",v:200},{q:"كاتب البؤساء؟",a:"فيكتور هوجو",v:300},{q:"اسم المتنبي؟",a:"أحمد بن الحسين",v:400},{q:"صاحب كتاب الحيوان؟",a:"الجاحظ",v:500}],
    "اختراعات": [{q:"مخترع المصباح؟",a:"إديسون",v:100},{q:"مخترع الهاتف؟",a:"غراهام بيل",v:200},{q:"مخترع الطائرة؟",a:"الأخوان رايت",v:300},{q:"مخترع الراديو؟",a:"ماركوني",v:400},{q:"المحرك البخاري؟",a:"جيمس واط",v:500}],
    "عامة": [{q:"لون الزمرد؟",a:"أخضر",v:100},{q:"صوت الأسد؟",a:"زئير",v:200},{q:"عملة بريطانيا؟",a:"الجنيه",v:300},{q:"أقرب كوكب للأرض؟",a:"الزهرة",v:400},{q:"أكبر محيط؟",a:"الهادي",v:500}]
};

let scores = [0, 0], currentTurn = 0, usedCategories = [], tempSelected = [];
let perks = { mute: [true, true] }, deletedCount = 0, questionsLeft = 0;

// نظام الصوت
let audioCtx;
function playSnd(t){
    if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.connect(g); g.connect(audioCtx.destination);
    g.gain.setValueAtTime(0.05, audioCtx.currentTime);
    if(t==='correct'){ o.frequency.setValueAtTime(523,0); o.frequency.exponentialRampToValueAtTime(880,0.2); }
    else if(t==='wrong'){ o.type='sawtooth'; o.frequency.setValueAtTime(150,0); }
    else { o.type='triangle'; o.frequency.setValueAtTime(440,0); }
    o.start(); o.stop(audioCtx.currentTime+0.2);
}

function saveNamesAndStart() {
    document.getElementById('display-name1').innerText = document.getElementById('name-team1').value || "الفريق 1";
    document.getElementById('display-name2').innerText = document.getElementById('name-team2').value || "الفريق 2";
    showCategorySelection();
}

function showCategorySelection() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('main-game').classList.add('hidden');
    document.getElementById('category-selection-screen').classList.remove('hidden');
    
    // ميزة الحذف للجولة الثانية
    if(usedCategories.length > 0) {
        document.getElementById('delete-perk-area').classList.remove('hidden');
        let winName = scores[0] >= scores[1] ? document.getElementById('display-name1').innerText : document.getElementById('display-name2').innerText;
        document.getElementById('winner-msg').innerText = `المتصدر: ${winName} (احذف 3 أسئلة)`;
    }

    const list = document.getElementById('categories-list');
    list.innerHTML = '';
    tempSelected = [];
    document.getElementById('selected-count').innerText = "0";

    Object.keys(questionsBank).forEach(cat => {
        const isPlayed = usedCategories.includes(cat);
        const div = document.createElement('div');
        div.className = 'category-item' + (isPlayed ? ' played' : '');
        div.innerText = cat;
        if(!isPlayed) {
            div.onclick = () => {
                if(tempSelected.includes(cat)) {
                    tempSelected = tempSelected.filter(c => c!==cat);
                    div.classList.remove('selected');
                } else if(tempSelected.length < 5) {
                    tempSelected.push(cat);
                    div.classList.add('selected');
                }
                document.getElementById('selected-count').innerText = tempSelected.length;
                document.getElementById('start-round-btn').disabled = tempSelected.length !== 5;
            };
        }
        list.appendChild(div);
    });
}

function confirmCategories() {
    usedCategories.push(...tempSelected);
    questionsLeft = tempSelected.length * 5; // 25 سؤال في الجولة
    document.getElementById('category-selection-screen').classList.add('hidden');
    document.getElementById('main-game').classList.remove('hidden');
    renderBoard();
}

function renderBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    tempSelected.forEach(cat => {
        const col = document.createElement('div');
        col.className = 'genre-column';
        col.style.flex = "1";
        col.innerHTML = `<div class="genre-title" style="background:var(--accent); padding:10px; border-radius:5px; margin-bottom:10px; text-align:center;">${cat}</div>`;
        [100, 200, 300, 400, 500].forEach(v => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerText = v;
            
            // تطبيق الحذف
            if(v === 500 && deletedCount > 0 && Math.random() > 0.5) {
                card.classList.add('disabled');
                card.innerText = "🗑️";
                questionsLeft--;
                deletedCount--;
            } else {
                card.onclick = () => openQuestion(cat, v, card);
            }
            col.appendChild(card);
        });
        board.appendChild(col);
    });
}

function finalize() {
    activeCard.classList.add('disabled');
    activeCard.onclick = null;
    questionsLeft--;
    document.getElementById('question-modal').classList.add('hidden');
    
    // التحقق من انتهاء الجولة
    if(questionsLeft <= 0) {
        setTimeout(() => {
            alert("انتهت الأسئلة! ننتقل الآن لاختيار أقسام الجولة الثانية.");
            showCategorySelection();
        }, 1000);
    } else {
        currentTurn = (currentTurn === 0 ? 1 : 0);
        updateUI();
    }
}

// باقي الدوال (openQuestion, handleResult, updateUI...) تبقى كما هي
// تأكد من استدعاء finalize() في نهاية منطق الإجابة
