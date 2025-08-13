import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authInitialState } from "../initialStates";
import { User } from "../../constants/interface/auth";

const SettingSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    updateUser(state, { payload }: PayloadAction<User | undefined>) {
      state.user = payload;
    },
    updateUserFields(
      state,
      { payload }: PayloadAction<{ email: string; name: string; bio: string }>
    ) {
      if (state.user) {
        state.user.email = payload.email ?? state.user.email;
        state.user.name = payload.name ?? state.user.name;
        state.user.bio = payload.bio ?? state.user.bio;
      }
    },
    updateUserPhotoField(state, { payload }: PayloadAction<{ photo: string }>) {
      if (state.user) {
        state.user.photo = payload.photo ?? state.user.photo;
      }
    },
  },
});

export const { updateUser, updateUserFields, updateUserPhotoField } =
  SettingSlice.actions;
export default SettingSlice.reducer;
