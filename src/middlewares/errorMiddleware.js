export const notFoundMiddleware = (req, res) => {
  return res.status(404).json({
    message: "Route not found",
  });
};

export const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  if (statusCode >= 500) {
    console.error(error);
  }

  return res.status(statusCode).json({
    message,
  });
};
