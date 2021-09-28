export class ApiError extends Error {
  public status: number;
  constructor(url: string, status: number) {
    super(`"${url}" returned ${status}`);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.name = "ApiError";
    this.status = status;
  }
}

export async function fetchJson(url: string, options?: RequestInit) {
  const resJson = await fetch(url, options);
  if (!resJson.ok) {
    throw new ApiError(url, resJson.status);
  }
  return await resJson.json();
}
