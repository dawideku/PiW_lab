import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.jsx"),
  route("/newbook", "routes/newbook.jsx"),
  route("/login", "routes/login.jsx"),
  route("/editbook/:id", "routes/editbook.jsx")
];
