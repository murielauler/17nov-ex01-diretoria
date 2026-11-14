// Conexão com o Supabase (chave pública: só permite inserir e ler respostas)
window.EX01 = {
  url: "https://vftqqpsnjuzwxylcipoh.supabase.co",
  key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmdHFxcHNuanV6d3h5bGNpcG9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNjc5MjIsImV4cCI6MjA2Mjk0MzkyMn0.99dINP5V7hoXdz25sB4OK-gFPwRLIQJ-9esw7vBVwCU",
  tabela: "stpauls_ex01_respostas",
};

// Lê ?turma=xxx da URL (só letras, números, - e _)
window.EX01.turma = (function () {
  var t = new URLSearchParams(location.search).get("turma") || "geral";
  t = t.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40);
  return t || "geral";
})();

// Aceita "45,4", "45.4", "R$ 45,4 mi", "8,7%", "1.234,5"
window.EX01.numero = function (txt) {
  if (txt == null) return null;
  var s = String(txt).trim().replace(/[^0-9,.\-]/g, "");
  if (!s) return null;
  if (s.indexOf(",") >= 0) s = s.replace(/\./g, "").replace(",", ".");
  else if ((s.match(/\./g) || []).length > 1) s = s.replace(/\./g, "");
  var n = parseFloat(s);
  return isFinite(n) ? n : null;
};

window.EX01.fmt = function (n, casas) {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: casas == null ? 1 : casas, maximumFractionDigits: casas == null ? 1 : casas });
};
