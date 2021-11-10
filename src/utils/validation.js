export const rules = [
  { field: "lastName", regExp: /[А-Яа-яЁё]+/, depends: null },
  { field: "firstName", regExp: /[А-Яа-яЁё]+/, depends: null },
  { field: "patronymic", regExp: /[А-Яа-яЁё]+/, depends: null },

  { field: "birthDate", date: true, depends: null },
  {
    field: "email",
    depends: null,
  },

  {
    field: "passportSeries",
    regExp: /^\d{4}$/,
    depends: { field: "citizenship", value: "🇷🇺" },
  },
  {
    field: "passportNumber",
    regExp: /^\d{6}$/,
    depends: { field: "citizenship", value: "🇷🇺" },
  },
  {
    field: "passportIssued",
    date: true,
    depends: { field: "citizenship", value: "🇷🇺" },
  },
  {
    field: "prevFirstName",
    regExp: /[А-Яа-яЁё]+/,
    depends: { field: "changedName", value: "yes" },
  },
  {
    field: "prevLastName",
    regExp: /[А-Яа-яЁё]+/,
    depends: { field: "changedName", value: "yes" },
  },
  {
    field: "latinFirstName",
    regExp: /[A-Za-z]+/,
    depends: { field: "citizenship", exclude: true, value: "🇷🇺" },
  },
  {
    field: "latinLastName",
    regExp: /[A-Za-z]+/,
    depends: { field: "citizenship", exclude: true, value: "🇷🇺" },
  },
  {
    field: "foreignPassportNumber",
    regExp: /.+/,
    depends: { field: "citizenship", exclude: true, value: "🇷🇺" },
  },
  {
    field: "foreignPassportCountry",
    regExp: /.+/,
    depends: { field: "citizenship", exclude: true, value: "🇷🇺" },
  },
  {
    field: "foreignPassportType",
    regExp: /.+/,
    depends: { field: "citizenship", exclude: true, value: "🇷🇺" },
  },
];
