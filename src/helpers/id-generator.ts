/**
 * @returns - company va service olish uchun ID generatsiya qilib raqam qaytaradi
 **/

export function generateId() {
  return Math.floor(Math.random() * 100) + 1
}
