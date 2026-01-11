export default function handler(req: Request): Response {
  return new Response(
    JSON.stringify({
      ok: true,
      message: "API is working"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
