let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const CitiesColombia = [
  "Bogotá",
  "Medellín",
  "Cali",
  "Barranquilla",
  "Cartagena de Bolivar Indias",
  "Soacha",
  "Cucuta",
  "Soledad",
  "Bucaramanga",
  "Bello",
  "Villavicencio",
  "Ibagué",
  "Santa Marta",
  "Valledupar",
  "Manizales",
  "Pereira",
  "Montería",
  "Neiva",
  "Pasto",
  "Armenia",
];

export const Colors = ["Red", "Yellow", "Green", "Orange", "Pink"];

export let currentDate = new Date();
export let CurrentDay = currentDate.getDate();
export let CurrentMonth = month[currentDate.getMonth()];
export let MonthNumber = currentDate.getMonth();
export let CurrentYear = currentDate.getFullYear();

export const days = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
];

export const getTotalDays = (MonthNumber, CurrentYear) => {
  if (MonthNumber === -1) {
    MonthNumber = 11;
  }

  if (
    MonthNumber === 9 ||
    MonthNumber === 2 ||
    MonthNumber === 4 ||
    MonthNumber === 6 ||
    MonthNumber === 7 ||
    MonthNumber === 9 ||
    MonthNumber === 11
  ) {
    return 31;
  } else if (
    MonthNumber === 3 ||
    MonthNumber === 5 ||
    MonthNumber === 8 ||
    MonthNumber === 10
  ) {
    return 30;
  } else {
    return isLeap(CurrentYear) ? 29 : 28;
  }
};

export const isLeap = (CurrentYear) => {
  return (
    (CurrentYear % 100 !== 0 && CurrentYear % 4 === 0) ||
    CurrentYear % 400 === 0
  );
};

export const StartDay = () => {
  let start = new Date(CurrentYear, MonthNumber, 1);
  return start.getDay() - 1 === -1 ? 6 : start.getDay() - 1;
};
