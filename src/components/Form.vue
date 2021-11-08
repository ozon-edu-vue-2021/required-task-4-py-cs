<template>
  <form class="form" autocomplete="off" v-on:submit="submit">
    <h3>Личные данные</h3>
    <div class="row">
      <div v-bind:class="getClass('lastName')">
        <label for="lastName">Фамилия</label>
        <input id="lastName" type="text" v-model="formData.lastName" />
      </div>
      <div v-bind:class="getClass('firstName')">
        <label for="firstName">Имя</label>
        <input id="firstName" type="text" v-model="formData.firstName" />
      </div>
      <div v-bind:class="getClass('patronymic')">
        <label for="patronymic">Отчество</label>
        <input id="patronymic" type="text" v-model="formData.patronymic" />
      </div>
    </div>
    <div class="row">
      <div v-bind:class="getClass('birthDate')">
        <label for="birthDate">Дата рождения</label>
        <input id="birthDate" type="date" v-model="formData.birthDate" />
      </div>
      <div v-bind:class="getClass('email')">
        <label for="email">E-mail</label>
        <input
          id="email"
          type="text"
          inputmode="email"
          v-model="formData.email"
        />
      </div>
      <div v-bind:class="getClass('gender')">
        <p class="radio-caption">Пол</p>
        <div class="radio-group">
          <label for="male">
            <input
              type="radio"
              name="gender"
              value="male"
              id="male"
              v-model="formData.gender"
            />
            Мужской</label
          >
          <label for="female">
            <input
              type="radio"
              name="gender"
              value="female"
              id="female"
              v-model="formData.gender"
            />
            Женский</label
          >
        </div>
      </div>
    </div>

    <h3>Паспортные данные</h3>
    <div class="field limited" v-click-outside="closeDropdown">
      <label for="citizenship">Гражданство</label>
      <input
        type="text"
        v-model="citizenshipSearch"
        id="citizenship"
        @focus="openDropdown"
      />
      <div v-if="isOpen">
        <ul
          v-if="filteredCitizenships.length"
          class="options"
          @click="handleSelectCitizenship"
        >
          <li
            class="option"
            v-for="cz in filteredCitizenships"
            :key="cz.id"
            :data-flag="cz.flag"
          >
            {{ cz.nationality }} ({{ cz.flag }})
          </li>
        </ul>
        <div class="no-options" v-else>Ничего не найдено</div>
      </div>
    </div>
    <div class="row" v-if="formData.citizenship === '🇷🇺'">
      <div v-bind:class="getClass('passportSeries')">
        <label for="passportSeries">Серия паспорта</label>
        <input
          id="passportSeries"
          type="text"
          v-model="formData.passportSeries"
        />
      </div>
      <div v-bind:class="getClass('passportNumber')">
        <label for="passportNumber">Номер паспорта</label>
        <input
          id="passportNumber"
          type="text"
          v-model="formData.passportNumber"
        />
      </div>
      <div v-bind:class="getClass('passportIssued')">
        <label for="passportIssued">Дата выдачи паспорта</label>
        <input
          id="passportIssued"
          type="date"
          v-model="formData.passportIssued"
        />
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div v-bind:class="getClass('latinFirstName')">
          <label for="latinFirstName">Имя на латинице</label>
          <input
            id="latinFirstName"
            type="text"
            v-model="formData.latinFirstName"
          />
        </div>
        <div v-bind:class="getClass('latinLastName')">
          <label for="latinLastName">Фамилия на латинице</label>
          <input
            id="latinLastName"
            type="text"
            v-model="formData.latinLastName"
          />
        </div>
      </div>
      <div class="row">
        <div v-bind:class="getClass('foreignPassportNumber')">
          <label for="foreignPassportNumber">Номер паспорта</label>
          <input
            id="foreignPassportNumber"
            type="text"
            v-model="formData.foreignPassportNumber"
          />
        </div>
        <div v-bind:class="getClass('foreignPassportCountry')">
          <label for="foreignPassportCountry">Страна выдачи</label>
          <select
            id="foreignPassportCountry"
            type="select"
            v-model="formData.foreignPassportCountry"
          >
            <option v-for="option in citizenships" :key="option.id">
              {{ option.nationality }}
            </option>
          </select>
        </div>
        <div v-bind:class="getClass('foreignPassportType')">
          <label for="foreignPassportType">Тип паспорта</label>
          <select
            id="foreignPassportType"
            type="select"
            v-model="formData.foreignPassportType"
          >
            <option v-for="option in passportTypes" :key="option.type">
              {{ option.type }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="field limited">
      <p class="radio-caption">Меняли ли имя / фамилию</p>
      <div class="radio-group">
        <label for="no">
          <input
            type="radio"
            name="changedName"
            value="no"
            id="no"
            v-model="formData.changedName"
          />
          Нет</label
        >
        <label for="yes">
          <input
            type="radio"
            name="changedName"
            value="yes"
            id="yes"
            v-model="formData.changedName"
          />
          Да</label
        >
      </div>
    </div>
    <div class="row" v-if="formData.changedName === 'yes'">
      <div v-bind:class="getClass('prevFirstName')">
        <label for="prevFirstName">Фамилия</label>
        <input
          id="prevFirstName"
          type="text"
          v-model="formData.prevFirstName"
        />
      </div>
      <div v-bind:class="getClass('prevLastName')">
        <label for="prevLastName">Имя</label>
        <input id="prevLastName" type="text" v-model="formData.prevLastName" />
      </div>
    </div>
    <button class="submit" type="submit">Отправить</button>
  </form>
</template>

<script>
import citizenships from "../assets/data/citizenships.json";
import passportTypes from "../assets/data/passport-types.json";
import ClickOutside from "vue-click-outside";
import { debounce } from "../utils/debounce";
import { filterByField } from "../utils/filterByField";
import { rules } from "../utils/validation";
import validator from "email-validator";

export default {
  data() {
    return {
      formData: {
        lastName: "",
        firstName: "",
        patronymic: "",
        birthDate: "",
        email: "",
        gender: "male",
        citizenship: "🇷🇺",
        passportSeries: "",
        passportNumber: "",
        passportIssued: "",
        changedName: "no",
        prevFirstName: "",
        prevLastName: "",
        latinFirstName: "",
        latinLastName: "",
        foreignPassportNumber: "",
        foreignPassportCountry: "",
        foreignPassportType: "",
      },
      isOpen: false,
      citizenships,
      passportTypes,
      filteredCitizenships: citizenships,
      citizenshipSearch: "",
      debouncedFilterCitizenships: null,
      validation: {},
    };
  },
  created() {
    this.debouncedFilterList = debounce(filterByField, 500);
    this.citizenshipSearch = this.extendedCitizenship;
    this.validation = Object.keys(this.formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
  },
  methods: {
    submit(e) {
      e.preventDefault();
      this.validate();
      if (this.isValid) console.log(JSON.stringify(this.formData));
    },
    openDropdown() {
      this.citizenshipSearch = "";
      this.isOpen = true;
    },
    closeDropdown() {
      this.citizenshipSearch = this.extendedCitizenship;
      this.isOpen = false;
    },
    handleSelectCitizenship(e) {
      const { flag } = e.target.dataset;
      this.formData.citizenship = flag;
      this.isOpen = false;
      this.citizenshipSearch = this.extendedCitizenship;
    },
    validate() {
      const validation = {};
      rules.forEach((rule) => {
        let dep = false;
        if (rule.depends) {
          dep = rule.depends.exclude
            ? this.formData[rule.depends.field] === rule.depends.value
            : this.formData[rule.depends.field] !== rule.depends.value;
        }
        validation[rule.field] = rule.date
          ? new Date(this.formData[rule.field]) < Date.now() || dep
          : rule.field === "email"
          ? validator.validate(this.formData[rule.field])
          : Boolean(this.formData[rule.field].match(rule.regExp)) || dep;
      });
      this.validation = { ...this.validation, ...validation };
    },
    getClass(field) {
      return {
        field: true,
        error: !this.validation[field],
      };
    },
  },
  computed: {
    isValid() {
      return !Object.values(this.validation).includes(false);
    },
    extendedCitizenship() {
      const { flag, nationality } = this.citizenships.find(
        (el) => el.flag === this.formData.citizenship
      );
      return `${nationality} ${flag}`;
    },
  },
  watch: {
    async citizenshipSearch() {
      this.filteredCitizenships = await this.debouncedFilterList(
        this.citizenships,
        "nationality",
        this.citizenshipSearch
      );
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
label,
p {
  padding: 5px 0;
  font-size: 13px;
  font-weight: 700;
}
h3 {
  margin: 30px 0 8px;
}
input,
select {
  border: none;
  background: transparent;
  font-size: 14px;
  padding: 5px 10px;
}
input:focus,
select:focus {
  outline: none;
}
.form {
  margin: 0 auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 10px;
}
.half {
  width: 50%;
}
.field {
  border-bottom: 2px solid teal;
  padding: 5px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.error {
  border-color: maroon;
}
.limited {
  width: 31%;
}
.radio-group {
  display: flex;
  justify-content: space-around;
  width: 200px;
}
.radio-caption {
  margin: 0;
}
.options {
  width: 200px;
  height: 200px;
  overflow: auto;
  position: absolute;
}
.option {
  cursor: pointer;
  border: 1px solid gray;
  background: white;
  list-style: none;
  font-size: 13px;
}
.option:hover {
  background: lightgray;
}
.submit {
  align-self: flex-end;
  width: min-content;
  padding: 5px 15px;
  background: palegreen;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: ease-in-out 0.25s;
}
.submit:hover {
  transform: scale(1.025);
  background: rgb(98, 207, 98);
}
.submit:active {
  transform: scale(1);
}
</style>
