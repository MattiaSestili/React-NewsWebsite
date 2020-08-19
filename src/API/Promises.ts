/**
 * Generic API class
 * Implements HTTP Request methods with Promises and async/await
 */
export const http = <T>(request: RequestInfo): Promise<T> => {
  return new Promise((resolve) => {
    fetch(request)
      .then((response) => response.json())
      .then((body) => {
        resolve(body);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export async function _get<T>(
  path: string,
  args: RequestInit = { method: "get" }
): Promise<T> {
  return await http<T>(new Request(path, args));
}

export async function _post<T>(
  path: string,
  body: any,
  args: RequestInit = { method: "post", body: JSON.stringify(body) }
): Promise<T> {
  return await http<T>(new Request(path, args));
}

export async function _put<T>(
  path: string,
  body: any,
  args: RequestInit = { method: "put", body: JSON.stringify(body) }
): Promise<T> {
  return await http<T>(new Request(path, args));
}
