// @ts-nocheck
function splitArray(array: string | any[], chunkSize: number) {
  const resArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    resArray.push(chunk);
  }
  return resArray;
}

export default splitArray;
