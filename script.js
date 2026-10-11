(function(){
  var floaters=document.getElementById('floaters');
  var no=document.getElementById('no'), yes=document.getElementById('yes');
  var hint=document.getElementById('hint');
  var askScr=document.getElementById('ask'), poemScr=document.getElementById('poem');
  var emojis=['🧡','❤️‍🔥','🔥','✨','🍂','💛'];
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tries=0, timer=null;
  var msgs=['Tem certeza? 🥺','Tenta de novo 🧡','Ei, o botão fugiu! 🏃','Só tem uma resposta certa 😌','Não vale desistir 🔥','Clica no Sim, vai 🦊'];

  function spawn(n,burst){
    if(reduce) return;
    if(window.innerWidth<600) n=Math.ceil(n/2);
    for(var i=0;i<n;i++){
      var s=document.createElement('span');
      var isEmoji=Math.random()<(burst?0.55:0.12);
      s.className='floater'+(isEmoji?'':' spark');
      if(isEmoji){ s.textContent=emojis[Math.floor(Math.random()*emojis.length)]; s.style.fontSize=(18+Math.random()*22)+'px'; }
      else{ var z=3+Math.random()*7; s.style.width=z+'px'; s.style.height=z+'px'; }
      s.style.left=Math.random()*100+'vw';
      s.style.setProperty('--dx',(Math.random()*120-60)+'px');
      var d=(burst?3+Math.random()*3:8+Math.random()*8);
      s.style.animationDuration=d+'s';
      s.style.animationDelay=(burst?Math.random()*1.2:Math.random()*4)+'s';
      floaters.appendChild(s);
      (function(el,t){setTimeout(function(){el.remove()},(t+5.5)*1000)})(s,d);
    }
  }
  function start(){ clearInterval(timer); timer=setInterval(function(){spawn(3,false)},1500); spawn(10,false); }

  function runAway(e){
    if(e && e.type==='pointerenter' && e.pointerType==='touch') return;
    if(e){ e.preventDefault(); }
    tries++;
    hint.textContent=msgs[(tries-1)%msgs.length];
    var w=no.offsetWidth, h=no.offsetHeight, pad=10;
    var maxX=window.innerWidth-w-pad, maxY=window.innerHeight-h-pad;
    var x,y,tr=0;
    do{
      x=pad+Math.random()*Math.max(0,maxX-pad);
      y=pad+Math.random()*Math.max(0,maxY-pad);
      tr++;
    }while(tr<12 && Math.abs(x-no.getBoundingClientRect().left)<80 && Math.abs(y-no.getBoundingClientRect().top)<80);
    if(!no.classList.contains('run')){
      var r=no.getBoundingClientRect();
      no.style.left=r.left+'px'; no.style.top=r.top+'px';
      no.classList.add('run');
      void no.offsetWidth;
    }
    no.style.left=x+'px'; no.style.top=y+'px';
    yes.style.transform='scale('+Math.min(1+tries*0.05,1.3)+')';
  }
  ['pointerenter','touchstart','click','focus'].forEach(function(ev){ no.addEventListener(ev,runAway,{passive:false}); });

  yes.addEventListener('click',function(){
    askScr.classList.add('hidden');
    poemScr.classList.remove('hidden');
    window.scrollTo(0,0);
    spawn(45,true);
  });
  document.getElementById('back').addEventListener('click',function(){
    poemScr.classList.add('hidden'); askScr.classList.remove('hidden');
    window.scrollTo(0,0);
  });
  window.addEventListener('resize',function(){
    if(!no.classList.contains('run')) return;
    var w=no.offsetWidth, h=no.offsetHeight;
    no.style.left=Math.max(10,Math.min(parseFloat(no.style.left)||0,window.innerWidth-w-10))+'px';
    no.style.top=Math.max(10,Math.min(parseFloat(no.style.top)||0,window.innerHeight-h-10))+'px';
  });
  start();
})();