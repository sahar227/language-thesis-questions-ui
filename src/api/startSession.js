import api from "./api";

export default async function startSession(code) {
  const { data } = await api.get("/user-session/start-session/" + code);
  return data;
}
