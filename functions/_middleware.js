export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // Allow login page assets
  if (url.pathname === '/login' || url.pathname.startsWith('/login-assets/')) {
    return next();
  }

  // Check authentication
  const cookie = request.headers.get('Cookie');
  if (cookie && cookie.includes('auth=valid')) {
    return next();
  }

  // Handle login POST
  if (url.pathname === '/auth' && request.method === 'POST') {
    const formData = await request.formData();
    const password = formData.get('password');

    if (password === env.SITE_PASSWORD) {
      return new Response('', {
        status: 302,
        headers: {
          'Location': '/',
          'Set-Cookie': 'auth=valid; Max-Age=86400; Path=/; HttpOnly; Secure'
        }
      });
    }
  }

  // Redirect to login
  return Response.redirect(url.origin + '/login', 302);
}