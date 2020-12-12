export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface EditCellRequest {
  cellId: number;
  changedCategory: string;
  changedValue: number;
}

export interface ClaimFirstCellRequest {
  cellId: number;
}
