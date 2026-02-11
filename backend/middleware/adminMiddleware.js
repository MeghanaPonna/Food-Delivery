
// Authorization middleware: Checks role ONLY
const adminMiddleware = (req, res, next) => {
  if (req.user.role?.trim().toLowerCase() !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }
  next();
};

export default adminMiddleware;
 