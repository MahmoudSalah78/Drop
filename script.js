let btn = document.getElementById('btn');
let inp = document.getElementById('inp');
let box = document.querySelectorAll('.box');
let drag = null;

// تحميل الأحداث المحفوظة من localStorage إذا كانت موجودة
let eventsLog = localStorage.getItem('eventsLog') ? JSON.parse(localStorage.getItem('eventsLog')) : [];

btn.onclick = function(){
    if(inp.value != '' ){
        box[0].innerHTML += `
        <p class="item" draggable="true">${inp.value}<p/>
        `
        inp.value ='';
        // تسجيل حدث إضافة عنصر جديد
        logEvent('New item added');
    }
    drags();
}

function drags(){
    let item = document.querySelectorAll('.item');
    item.forEach(item=>{
        item.addEventListener('dragstart', function(){
            drag = item;
            item.style.opacity = '0.5';
        })
        item.addEventListener('dragend', function(){
            drag = null;
            item.style.opacity = '1';
        })
        box.forEach(box=>{
            box.addEventListener('dragover', function(e){
                e.preventDefault()
                this.style.background = '#090';
                this.style.color = '#fff'
            })
            box.addEventListener('dragleave', function(){
                this.style.background = '#fff';
                this.style.color = 'black'
            })
            box.addEventListener('drop', function(){
                box.append(drag);
                this.style.background = '#fff';
                this.style.color = 'black';
                // تسجيل حدث إسقاط عنصر
                logEvent('Item dropped');
            })
        })
    })
}

// إضافة حدث إلى سجل الأحداث
function logEvent(event) {
    eventsLog.push(event);
    localStorage.setItem('eventsLog', JSON.stringify(eventsLog));
}
