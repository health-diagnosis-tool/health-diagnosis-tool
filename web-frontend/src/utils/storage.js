

export function getUsers() {
  return JSON.parse(localStorage.getItem("healthdx_users")) || {};
}

export function saveUser(userId, user) {
  const users = getUsers();
  users[userId] = user;
  localStorage.setItem("healthdx_users", JSON.stringify(users));
}

export function getUserById(userId) {
  const users = getUsers();
  return users[userId] || null;
}

export function clearUsers() {
  localStorage.removeItem("healthdx_users");
}



export function saveLog(log) {
  const logs = JSON.parse(localStorage.getItem("healthdx_logs")) || [];
  logs.push(log);
  localStorage.setItem("healthdx_logs", JSON.stringify(logs));
}

export function getLogs() {
  return JSON.parse(localStorage.getItem("healthdx_logs")) || [];
}
