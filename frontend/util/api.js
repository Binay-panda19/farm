const API_BASE = "http://localhost:5000/api";

async function apiRequest(endpoint, method="GET", body=null, token=null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });

  if (!response.ok) throw new Error(await response.text());
  return await response.json();
}
