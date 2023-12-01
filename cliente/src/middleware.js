'use server'
import { NextResponse } from "next/server";
import { validateToken } from "./app/functions/validateToken";

export const middleware = async (request) => {

    const token = request.cookies.get('token')?.value;
    const urlLogin = new URL('/', request.url);
    const urlDash = new URL('/pages/dashboard', request.url);
    const isTokenValidated = await validateToken(token);

    if (!isTokenValidated || !token) {
        if (request.nextUrl.pathname === '/pages/dashboard' || request.nextUrl.pathname === '/pages/register' || request.nextUrl.pathname === '/pages/alterar' ) {
            return NextResponse.redirect(urlLogin);
        }
    }
    if (isTokenValidated) {
        if (request.nextUrl.pathname === '/') {
            return NextResponse.redirect(urlDash);
        }
    }
    if (!isTokenValidated || !token) {
        function Mudarestado() {
          var display = document.getElementById('minhadiv').style.display;
          document.getElementById('minhadiv').style.display = 'none';
         /* if(display == "none")
              document.getElementById('minhadiv').style.display = 'block';
          else
              document.getElementById('minhadiv').style.display = 'none';
      */}
  }
    NextResponse.next();
};
export const config = {
    matcher: ['/', '/pages/dashboard','/pages/register','/pages/alterar']
};


