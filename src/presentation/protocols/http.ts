export interface HttpResponse {
  statusCode: number
  body: any
  error?: any
}

export interface HttpRequest {
  body?: any
  headers?: any
  params?: any
  token?: any
  query?: any
}
