import { AuthSliceType } from "../constants/interface/auth";
import { PCMemberSliceType } from "../constants/interface/admin/members";
import { UnionMemberSliceType } from "../constants/interface/union/members";

export const authInitialState: AuthSliceType = {};

export const PcMemberInitialState: PCMemberSliceType = {
  membersList: [],
  loading: false,
  error: null,
};
export const UnionMemberInitialState: UnionMemberSliceType = {
  membersList: [],
  loading: false,
  error: null,
};
