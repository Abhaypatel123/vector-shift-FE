// api.js
import { BASE_URL } from "./config";
import { API_ENDPOINTS } from "./endpoints";

export async function parsePipeline(nodes, edges) {
  const response = await fetch(BASE_URL + API_ENDPOINTS.PARSE_PIPELINE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nodes: nodes.map((n) => n.id),
      edges: edges.map((e) => [e.source, e.target]),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to submit pipeline");
  }

  return response.json();
}
