export function saveUser(user) {
  localStorage.setItem("healthdx_user", JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem("healthdx_user");
  return user ? JSON.parse(user) : null;
}

export function clearUser() {
  localStorage.removeItem("healthdx_user");
}

export function saveLog(log) {
  const logs = JSON.parse(localStorage.getItem("healthdx_logs")) || [];
  logs.push(log);
  localStorage.setItem("healthdx_logs", JSON.stringify(logs));
}

export function getLogs() {
  return JSON.parse(localStorage.getItem("healthdx_logs")) || [];
}
