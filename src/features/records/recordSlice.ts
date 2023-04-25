import { Action, PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { Record } from "./Record";
import { RootState } from "../../app/store";


export type RecordSlice = {
  record: Record[];
  selectedRecords: Record[] | null;
}
const defaultState: RecordSlice = {
  record: [],
  selectedRecords: []
};


const slice = createSlice({
  name: 'records',
  initialState: defaultState,
  reducers: {
    setRecordsList: (state, action: PayloadAction<Record[]>) => {
      state.record = action.payload;
    },
    setSelectedRecord: (state, action: PayloadAction<Record[]>) => {
      state.selectedRecords = action.payload
    }
  },
});

const recordReducer = slice.reducer;

export const {
  setRecordsList,
  setSelectedRecord,
} = slice.actions

export default recordReducer;


export const getAllArticles = (): ThunkAction<void, RootState, unknown, Action<unknown>> => {
  return async (dispatch, getState) => { }
}