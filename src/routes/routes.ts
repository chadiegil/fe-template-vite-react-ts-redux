export const routes = {
  home: "/",
  notFound: "*",
  about: "/about",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
  admin: {
    post: "/admin/post/create",
    editPost: "admin/post/edit/:id",
    deletePost: "admin/post/delete/:id",
    settings: "/admin/settings",
  },
}
