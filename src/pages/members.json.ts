import members from "../members.json";

export async function GET() {
  return new Response(JSON.stringify(members), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
