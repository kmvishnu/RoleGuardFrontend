import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {


const adminRoutes = [
    "/dashboard/allUsers",
    "/dashboard/updateRole",
  ];
const { pathname } = request.nextUrl;
const token = request.cookies.get('token')?.value;
const isTokenValid = (token:any) => {
    try {
      const decoded:any = jwtDecode(token);
      const now = Date.now().valueOf() / 1000;
      return { role:decoded.role, isValid:decoded.exp > now} 
    } catch (error) {
      return {role:'', isValid:false};
    }
  };
  
  const {role,isValid} = isTokenValid(token);


if(!token || !isValid){
    return NextResponse.redirect(
        new URL('/login', request.url)
    )
}
if (
    (role !== "admin" ) &&
    (adminRoutes.includes(pathname))
  ) {
    return NextResponse.redirect( new URL('/dashboard', request.url));
  }

return NextResponse.next();
}
 

export const config = {
  matcher: ['/dashboard/allUsers','/dashboard/updateRole','/dashboard'],
}