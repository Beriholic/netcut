export function getRandomString(length: number): String {
  const base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += base.charAt(Math.floor(Math.random() * base.length));
  }

  return result;
}
