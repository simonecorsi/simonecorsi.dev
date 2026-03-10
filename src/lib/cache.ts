// This in-memory "cache" serves to speed-up local development

const InMemory = new Map<string, unknown>();

export function set(key: string, value: unknown, cache = InMemory): void {
  cache.set(key, value);
}

export async function proxyCache<T>(
  key: string | ((result: T) => string),
  executor: () => Promise<T>,
  cache = InMemory,
): Promise<T> {
  if (typeof key === "string" && cache.has(key)) {
    return cache.get(key) as T;
  }

  const result = await executor();

  const cacheKey = typeof key === "function" ? key(result) : key;

  set(cacheKey, result);
  return result;
}
