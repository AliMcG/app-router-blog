export async function typeSafeFetch<T>(
  request: RequestInfo,
  body?: RequestInit,
): Promise<T> {
  const response = await fetch(request, body);
  const result = (await response.json()) as T;
  return result;
}
