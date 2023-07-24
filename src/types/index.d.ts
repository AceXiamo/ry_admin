declare type ResponseData<T> = {
  code: number;
  data: T;
  msg: string;
}

declare type ResponsePageData<T> = {
  code: number;
  msg: string;
  rows: T;
  total: number;
}
