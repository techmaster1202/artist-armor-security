export interface Member {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface UnionMemberSliceType {
  membersList: Member[];
  loading: boolean;
  error: string | null;
}
