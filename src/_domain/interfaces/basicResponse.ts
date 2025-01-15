export interface IBasicResponse<T> {
  data: T
  path: string
  duration: string
  method: string
}