import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth",
  },
});

export const config = {
  matcher: [
    "/home/:path*",
    "/movies/:path",
    "/profile/:path",
    "/playlists/:path",
  ],
};
