(() => {
const t=(fa,de,en)=>document.documentElement.lang==='de'?de:document.documentElement.lang==='en'?en:fa;
const mark='<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="3" y="3" width="34" height="34" rx="10" fill="currentColor" stroke="none"/><path d="m11 13 7 7-7 7m11 0h7" fill="none" stroke="#112d35" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function apply(r){const brand=document.querySelector('.brand');if(brand)brand.innerHTML='<span class="arefi-symbol">'+mark+'</span><span class="arefi-wordmark" dir="ltr">Arefi<span>ITPRAXIS</span></span>';
 document.title=document.title.replace(/ServerLab|Arefi IT Lab/g,'Arefi ITPraxis');
 const footer=document.querySelector('footer span');if(footer)footer.textContent=t('Arefi ITPraxis · یادگیری با انجام کار','Arefi ITPraxis · Durch Anwenden lernen','Arefi ITPraxis · Learn by doing');
 const workspace=document.querySelector('.workspace-label');if(workspace)workspace.textContent=t('آکادمی شخصی مدیریت سیستم','Dein Lab für Systemverwaltung','Your systems administration lab');
 if(r.page==='path'){const main=document.querySelector('main');main.insertAdjacentHTML('afterbegin',`<section class="arefi-welcome"><div><span class="release-badge">Arefi ITPraxis <b>2.0</b></span><h1>${t('از اولین VM تا حل مسئلهٔ واقعی','Von der ersten VM zur selbst gelösten Aufgabe','From your first VM to independent problem solving')}</h1><p>${t('Windows Server، Linux و شبکه را مرحله‌به‌مرحله تمرین کن.','Übe Windows Server, Linux und Netzwerke Schritt für Schritt.','Practise Windows Server, Linux and networks step by step.')}</p></div><div class="welcome-actions">${location.host==='127.0.0.1:18764'?`<a class="btn" href="#lab">${t('پشتیبان‌گیری از پیشرفت','Lernstand sichern','Back up progress')}</a>`:`<a class="btn" href="#desktop">${t('نسخهٔ Windows','Windows-Version','Windows version')}</a>`}<a class="btn secondary" href="#guide">${t('راهنمای شروع','Einstieg','Getting started')}</a></div></section>`);}
}
window.ArefiBrand={apply};
})();
