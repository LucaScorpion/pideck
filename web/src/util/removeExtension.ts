export function removeExtension(path: string): string {
  const lastIndex = path.lastIndexOf('.');
  return lastIndex >= 0 ? path.substring(0, lastIndex) : path;
}
