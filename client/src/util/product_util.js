export const toPounds = (kg) => {
  let lbsPerKg = 2.20462;
  let pounds = kg * lbsPerKg;
  return +pounds.toFixed(2);
};

export const toKilos = (lbs) => {
  let lbsPerKg = 2.20462;
  let kilos = lbs / lbsPerKg;
  return +kilos.toFixed(2);
};
