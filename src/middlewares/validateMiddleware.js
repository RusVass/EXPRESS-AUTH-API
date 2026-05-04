const validateMiddleware = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      messages: result.error.issues.map((i) => i.message),
    });
  }

  req.body = result.data;
  next();
};

export default validateMiddleware;
