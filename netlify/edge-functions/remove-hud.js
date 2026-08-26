export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();
  html = html.replace(/<script[^>]*data-netlify-site-id[^>]*><\/script>/g, "");
  html = html.replace(/<script[^>]*src="\/\.netlify\/scripts\/hud[^"]*"[^>]*><\/script>/g, "");

  return new Response(html, {
    status: response.status,
    headers: response.headers,
  });
};

export const config = { path: "/*" };
