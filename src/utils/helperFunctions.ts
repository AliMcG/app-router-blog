export async function typeSafeFetch<T>(
  request: RequestInfo,
  body?: RequestInit,
): Promise<T> {
  const response = await fetch(request, body);
  const result = (await response.json()) as T;
  return result;
}

/** sets the file input default to these image.files.types */ 
export const imageMimeType = /image\/(png|jpg|jpeg)/i;