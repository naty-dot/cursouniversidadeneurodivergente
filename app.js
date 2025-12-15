const LOGIN_PASSWORD = "UNICURSO";
const ADMIN_EMAIL = "admin@unicurso.com";
const ADMIN_CODE = "ADMCURSO";

const LS = {
  session:"uc_session",
  db:"uc_db",
  theme:"uc_theme"
};

// ================= SESSÃO =================
function getSession(){
  return JSON.parse(localStorage.getItem(LS.session) || '{"logged":false}');
}
function setSession(s){
  localStorage.setItem(LS.session,JSON.stringify(s));
}
function logout(){
  localStorage.removeItem(LS.session);
  location.href="login.html";
}
function requireAuth(){
  if(!getSession().logged){
    location.href="login.html";
    return false;
  }
  return true;
}
function requireAdmin(){
  const s=getSession();
  if(!s.logged || s.role!=="admin"){
    location.href="dashboard.html";
    return false;
  }
  return true;
}

// ================= TEMA =================
function getTheme(){
  return localStorage.getItem(LS.theme)||"light";
}
function toggleTheme(){
  const t=getTheme()==="light"?"dark":"light";
  localStorage.setItem(LS.theme,t);
  applyTheme();
}
function applyTheme(){
  document.documentElement.setAttribute("data-theme",getTheme());
}

// ================= DB =================
function getDB(){
  let db=JSON.parse(localStorage.getItem(LS.db));
  if(!db){
    db={
      courses:[
        {
          id:"curso1",
          title:"Curso Exemplo",
          subtitle:"Aprenda com acessibilidade",
          cover:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
          modules:[
            {
              id:"m1",
              title:"Introdução",
              cover:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
              video:"https://www.youtube.com/embed/pQN-pnXPaVg",
              done:false
            }
          ]
        }
      ]
    };
    localStorage.setItem(LS.db,JSON.stringify(db));
  }
  return db;
}
function saveDB(db){
  localStorage.setItem(LS.db,JSON.stringify(db));
}
