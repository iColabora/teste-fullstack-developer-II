export const validate = (schema) => async (req, res, next) => {
  const data = req.body;

  try {
    const validatedData = await schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    req.validatedData = validatedData;
    next();
  } catch (e) {
    console.error(e);
    res.status(422).json({ [e.name]: e.errors });
  }
};
