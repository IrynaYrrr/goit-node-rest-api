import { HttpError } from "./HttpError.js";

export const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, 'Помилка від Joi або іншої бібліотеки валідації'));
    }
    next();
  };

  return func;
};
