export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
}

export interface PaginatedApiResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
  statusCode: number;
}

export interface SearchResponse<T> extends PaginatedApiResponse<T> {
  suggestions: {
    categories: string[];
    locations: string[];
    relatedTerms: string[];
  };
}
