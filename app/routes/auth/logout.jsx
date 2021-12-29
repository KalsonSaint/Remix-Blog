const { redirect } = require("remix");
const { logout } = require("~/utils/session.server");

export const action = async ({ request }) => {
  return logout(request);
};

export const loader = async () => {
  return redirect("/");
};
