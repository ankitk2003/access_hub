// middlewares/manager.js


function managerMiddleware(req, res, next) {
  if (req.role !== "manager") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Manager only.",
    });
  }

  next();
};

export  {managerMiddleware};