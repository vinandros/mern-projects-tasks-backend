import jwt from "jsonwebtoken";

export default function (req, res, next) {
  //read header token
  const token = req.header("x-auth-token");

  //check if token exist
  if (!token) {
    return res.status(401).json({ msg: "Missing token, permission denied!" });
  }

  //token validation
  try {
    const validationResult = jwt.verify(token, process.env.SECRET);
    req.user = validationResult.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token!" });
  }
}
