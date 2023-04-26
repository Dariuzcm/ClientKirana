import { Action, PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { Record } from "./Record";
import { RootState } from "../../app/store";
import { getJsonCSV } from "../../util/cvsHandler";


export type RecordSlice = {
  records: Record[];
  selectedRecords: Record[] | null;
  jsonCSV: {},
  loading: boolean
}
const defaultState: RecordSlice = {
  records: [],
  selectedRecords: [],
  jsonCSV: {},
  loading: false
};


const slice = createSlice({
  name: 'records',
  initialState: defaultState,
  reducers: {
    setRecordsList: (state, action: PayloadAction<Record[]>) => {
      state.records = action.payload;
    },
    setSelectedRecord: (state, action: PayloadAction<Record[]>) => {
      state.selectedRecords = action.payload
    },
    setCSV: (state, action: PayloadAction<any>) => {
      state.jsonCSV = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  },
});

const recordReducer = slice.reducer;

export const {
  setRecordsList,
  setSelectedRecord
} = slice.actions

export default recordReducer;


export const getAllArticles = (): ThunkAction<void, RootState, unknown, Action<unknown>> => {
  return async (dispatch, getState) => { }
}
export const getCSVtoJson = (string: string): ThunkAction<void, RootState, unknown, Action<unknown>> => {
  return async (dispatch, getState) => { 
    slice.actions.setLoading(true)
    try {
      const json = await getJsonCSV(string)
      dispatch(slice.actions.setCSV(json))
      slice.actions.setLoading(false)
    } catch (error) {
      slice.actions.setLoading(false)
    }
  }
}