const pause = (duration: number): Promise<void> =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise((res) => setTimeout(res, duration));

export function debounce<K extends any[], T>(
  func: (...args: K) => T,
  ms: number
) {
  let args: K;
  let result: T;
  return async function debounceScoped(...debounceArgs: K) {
    args = debounceArgs;
    await pause(ms);
    if (args === debounceArgs) {
      result = func(...args);
    }
    return result;
  };
}
