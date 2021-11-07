export const rules = [
  { field: "lastName", regExp: /[А-Яа-я]+/, depends: null },
  { field: "firstName", regExp: /[А-Яа-я]+/, depends: null },
  { field: "patronymic", regExp: /[А-Яа-я]+/, depends: null },

  { field: "birthDate", date: true, depends: null },
  {
    field: "email",
    regExp:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
    regExp: /[А-Яа-я]+/,
    depends: { field: "changedName", value: "yes" },
  },
  {
    field: "prevLastName",
    regExp: /[А-Яа-я]+/,
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
