import * as yup from "yup";
import { IntervalEnum } from "../types";

const requiredString = "Toto pole je povinné";
export const validationSchema = yup.object({
  amount: yup
    .number()
    .required(requiredString)
    .moreThan(0, "Částka musí být větší než 0"),
  name: yup.string().required(requiredString),
  accountNumber: yup
    .string()
    .required(requiredString)
    .matches(
      /^[A-Za-z]{2}[0-9]{22}$/,
      "Číslo účtu musí obsahovat 2 písmena následovaná 22 čísly"
    ),
  variableSymbol: yup.string().required(requiredString),
  specificSymbol: yup.string().required(requiredString),
  constantSymbol: yup.string().required(requiredString),
  note: yup.string().required(requiredString),
  intervalId: yup.number().required(requiredString),
  validFrom: yup.date().required(requiredString),
});

export const daysOfWeek = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek"];
