import { StandingOrderListType } from "@/app/common/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedOrdersState {
  selectedOrders: number[];
  selectedOrdersValue: number;
}

const initialState: SelectedOrdersState = {
  selectedOrders: [],
  selectedOrdersValue: 0,
};

const selectedOrdersSlice = createSlice({
  name: "selectedOrders",
  initialState,
  reducers: {
    toggleOrderSelection: (
      state,
      action: PayloadAction<StandingOrderListType>
    ) => {
      const order = action.payload;
      if (state.selectedOrders.includes(order.standingOrderId)) {
        state.selectedOrders = state.selectedOrders.filter(
          (id) => id !== order.standingOrderId
        );
        state.selectedOrdersValue -= order.amount;
      } else {
        state.selectedOrders.push(order.standingOrderId);
        state.selectedOrdersValue += order.amount;
      }
    },
    selectAllOrders: (
      state,
      action: PayloadAction<StandingOrderListType[]>
    ) => {
      state.selectedOrders = action.payload.map(
        (order) => order.standingOrderId
      );
      state.selectedOrdersValue = action.payload.reduce(
        (sum, order) => sum + order.amount,
        0
      );
    },
    clearAllSelections: (state) => {
      state.selectedOrders = [];
      state.selectedOrdersValue = 0;
    },
  },
});

export const { toggleOrderSelection, selectAllOrders, clearAllSelections } =
  selectedOrdersSlice.actions;
export default selectedOrdersSlice.reducer;
