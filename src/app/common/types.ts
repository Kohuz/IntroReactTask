import dayjs, { Dayjs } from "dayjs";

export interface StandingOrderListType {
  standingOrderId: number;
  amount: number;
  name: string;
  accountNumber: string;
  interval: string;
  nextRealizationDate: Date;
}
export interface StandingOrderDetailType {
  amount: number;
  name: string;
  accountNumber: string;
  variableSymbol: string;
  specificSymbol: string;
  constantSymbol: string;
  note: string;
  intervalId: number;
  intervalSpecification: number;
  validFrom: Dayjs;
}

export interface StandingOrdersArrayProps {
  orders: StandingOrderListType[] | undefined;
}

export interface StandingOrderProps {
  order: StandingOrderListType;
}

export interface PeriodicityOption {
  value: number;
  text: string;
}
export interface ConstantSymbolOption {
  value: number;
  text: string;
}

export enum IntervalEnum {
  DAILY = 1,
  WEEKLY = 2,
  MONTHLY = 3,
}
