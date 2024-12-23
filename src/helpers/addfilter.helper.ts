export function addFilter(column: string, value: any, operator: string) {
  return {
    column,
    value,
    operator,
  }
}
