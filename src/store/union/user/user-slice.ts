import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member } from "../../../constants/interface/union/members.ts";
import { UnionMemberInitialState } from "../../initialStates.ts";

const memberSlice = createSlice({
  name: "Members",
  initialState: UnionMemberInitialState,
  reducers: {
    getMembers: (state, { payload }: PayloadAction<Member[]>) => {
      state.membersList = payload;
    },
  },
});

export const { getMembers } = memberSlice.actions;
export default memberSlice.reducer;
