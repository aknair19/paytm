import jwt from "jsonwebtoken";

export const authmiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  //   console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      message: "Auth header not found or invalid",
    });
  }

  const token = authHeader.split(" ")[1];
  //   console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    console.log(decoded);
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};
