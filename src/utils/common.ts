export function parseStrEmpty(str: any) {
  if (!str || str == "undefined" || str == "null") {
    return "";
  }
  return str;
}
