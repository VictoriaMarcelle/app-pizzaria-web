export interface IPageableSort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface IPageable {
  sort: IPageableSort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean
}

export default interface IPageableResponse {
  content: Array<any>;
  pageable: IPageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: IPageableSort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
