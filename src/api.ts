function seededRandom(seed: number) {
  var m = 2 ** 35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
}

export async function fetchAPI(date: Date) {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 1000 + 100)
  );

  let result = [];
  let random = seededRandom(date.getDate());

  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) {
      result.push(i + ":00");
    }
    if (random() < 0.5) {
      result.push(i + ":30");
    }
  }
  return result;
}

export async function submitAPI(formData: Record<string, any>) {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 1000 + 100)
  );

  return true;
}
