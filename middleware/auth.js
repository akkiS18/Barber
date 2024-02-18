export default function (req, res, next) {
  if (!req.cookies.token || !isPassEqual || !existUser || !email || !password) {
    res.redirect("/login");
    return;
  }

  next();
}
