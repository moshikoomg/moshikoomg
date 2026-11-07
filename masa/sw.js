self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
  let d={};try{d=e.data.json()}catch(_){d={title:'מסע ההתפתחות שלי',body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.title||'מסע ההתפתחות שלי',{body:d.body||'',icon:'icon.svg',badge:'icon.svg',dir:'rtl',lang:'he',tag:d.tag||'masa',renotify:true,data:{url:d.url||'./'}}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const url=new URL((e.notification.data&&e.notification.data.url)||'./',self.registration.scope).href;
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if(c.url.startsWith(self.registration.scope))return c.focus()}return clients.openWindow(url)}));
});
