(()=>{
  const cleanPhone=v=>String(v||'').replace(/[^0-9+]/g,'');
  function makePhonesClickable(root=document){
    root.querySelectorAll('.item b').forEach(b=>{
      if(b.querySelector('.phone-link'))return;
      const text=b.textContent||'';
      const m=text.match(/(?:\+216\s*)?[2459]\d(?:[\s.-]?\d){6}/);
      if(!m)return;
      const number=cleanPhone(m[0]);
      const before=text.slice(0,m.index),after=text.slice((m.index||0)+m[0].length);
      b.textContent=before;
      const a=document.createElement('a');a.className='phone-link';a.href='tel:'+number;a.textContent='📞 '+m[0];a.setAttribute('aria-label','Appeler '+m[0]);
      b.append(a,document.createTextNode(after));
    });
  }
  function addBottomNav(){
    if(document.querySelector('.mobile-bottom-nav'))return;
    const tabs=document.querySelectorAll('#tabs .tab');if(!tabs.length)return;
    const nav=document.createElement('nav');nav.className='mobile-bottom-nav';nav.setAttribute('aria-label','Navigation principale');
    tabs.forEach((tab,i)=>{const b=document.createElement('button');b.type='button';b.innerHTML=`<span>${i===0?'📦':i===1?'🏪':'💰'}</span>${tab.textContent.replace(/^\S+\s*/,'')}`;b.onclick=()=>{tab.click();nav.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on')};if(tab.classList.contains('on'))b.classList.add('on');nav.appendChild(b)});document.body.appendChild(nav);
  }
  function installHint(){
    const isiOS=/iphone|ipad|ipod/i.test(navigator.userAgent),standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone;
    if(!isiOS||standalone||localStorage.getItem('hideInstallHint'))return;
    const d=document.createElement('div');d.className='ios-install-hint';d.innerHTML='لإضافة التطبيق للشاشة الرئيسية: اضغط مشاركة ثم «إضافة إلى الشاشة الرئيسية».<button aria-label="إغلاق">×</button>';d.querySelector('button').onclick=()=>{d.remove();localStorage.setItem('hideInstallHint','1')};document.body.appendChild(d);
  }
  const observer=new MutationObserver(()=>{makePhonesClickable();addBottomNav()});observer.observe(document.documentElement,{childList:true,subtree:true});
  addEventListener('DOMContentLoaded',()=>{makePhonesClickable();addBottomNav();installHint()});
  if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.error));
})();
