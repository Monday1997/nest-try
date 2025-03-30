export function transformObjToArr(originObj = {}, defaultObj = { id: 'desc' }) {
  const uniqueKes = new Set([
    ...Object.keys(originObj),
    ...Object.keys(defaultObj),
  ]);

  return Array.from(uniqueKes).map((key) => {
    const value = originObj[key] || defaultObj[key];
    return {
      [key]: value,
    };
  });
}
