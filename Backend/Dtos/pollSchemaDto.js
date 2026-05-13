import Joi from "joi";
import BaseDTO from "./dto.js";

const optionSchema = Joi.object({
  text: Joi.string().required(),
  vote: Joi.number().min(0).default(0),
});

class pollSchemaDto extends BaseDTO {
  static schema = Joi.object({
    question: Joi.string().required(),
    options: Joi.array().items(optionSchema).required(),

    clientId: Joi.string().optional(),

    isActive: Joi.boolean().default(false),

    expiresAt: Joi.date().optional(),
  });
}

export default pollSchemaDto;
