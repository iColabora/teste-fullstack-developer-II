import * as yup from "yup";
import { v4 as uuid4 } from "uuid";

export const icolaboraSchema = yup.object().shape({
  label: yup.string().max(200).required(),
  simpleText: yup.string().max(30),
  longText: yup.string().max(100),
  freeContent: yup.string(),
  id: yup
    .string()
    .default(() => {
      return uuid4();
    })
    .transform(() => {
      return uuid4();
    }),
});
