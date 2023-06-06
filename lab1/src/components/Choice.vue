<template>
  <div v-if="arr">
    <div class="py-2 h5 ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3">
      <b>Choose the right translation</b>
      <hr />
    </div>
    <div class="py-2 h5 ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3">
      <h6 id="main_word">{{ arr[num].title }}</h6>
      <div id="transl_h" style="display: none">{{ arr[num].title }}</div>
    </div>
    <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
      <label class="options" :class="{ selected: one }">
        <div class="txt-option" id="tr_1">{{ arr[0].translation }}</div>
        <input
          type="radio"
          name="radio"
          id="rad_1"
          @change="onChange($event)"
          value="1"
          v-model="one"
        />
        <span class="checkmark"></span>
      </label>
      <label class="options" :class="{ selected: two }">
        <div class="txt-option" id="tr_2">{{ arr[1].translation }}</div>
        <input
          type="radio"
          name="radio"
          id="rad_2"
          @change="onChange($event)"
          value="2"
          v-model="two"
        />
        <span class="checkmark"></span>
      </label>
      <label class="options" :class="{ selected: three }">
        <div class="txt-option" id="tr_3">{{ arr[2].translation }}</div>
        <input
          type="radio"
          name="radio"
          id="rad_3"
          @change="onChange($event)"
          value="3"
          v-model="three"
        />
        <span class="checkmark"></span>
      </label>
      <label class="options" :class="{ selected: four }">
        <div class="txt-option" id="tr_4">{{ arr[3].translation }}</div>
        <input
          type="radio"
          name="radio"
          id="rad_4"
          @change="onChange($event)"
          value="4"
          v-model="four"
        />
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="d-flex align-items-center pt-3">
      <div class="ml-auto mr-sm-5"></div>
      <button class="btn btn-primary" id="check" @click="choice()">
        Check
      </button>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Choice",
  props: {
    arr: Array,
    num: Number,
  },
  data() {
    return {
      one: "",
      two: "",
      three: "",
      four: "",
    };
  },
  methods: {
    onChange(event) {
      var data = event.target.value;
      this.one = false;
      this.two = false;
      this.three = false;
      this.four = false;
      if (data === "1") this.one = true;
      else if (data === "2") this.two = true;
      else if (data === "3") this.three = true;
      else if (data === "4") this.four = true;
      console.log(data);
    },
    define(ps) {
      console.log(ps);
      console.log(this.num);
      console.log(this.arr[this.num].title);
      console.log(this.arr[ps].title);
      if (this.arr[this.num] != undefined && this.arr[this.num] != undefined) {
        if (this.arr[ps].title === this.arr[this.num].title) {
          alert("Successfull guess");
        } else {
          alert("Just give yourself else one try!!!");
        }
      } else alert("Empty choice((");
    },
    choice() {
      if (this.one) this.define(0);
      else if (this.two) this.define(1);
      else if (this.three) this.define(2);
      else if (this.four) this.define(3);
    },
  },
};
</script>
<style>
#main_word {
  color: #000000;
  font-size: 24px;
  font-weight: bold;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.options {
  position: relative;
  padding-left: 40px;
  background-color: #21bf73;
}
.txt-option {
  color: #000000;
  font-size: 16px;
  font-weight: bold;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.options:hover {
  background-color: #0e5e37;
}
#options label {
  display: block;
  margin-bottom: 15px;
  font-size: 14px;
  cursor: pointer;
}
.options input {
  opacity: 0;
}
.checkmark {
  position: absolute;
  top: -1px;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #555;
  border: 1px solid #ddd;
  border-radius: 50%;
}
.options input:checked ~ .checkmark:after {
  display: block;
}
.options .checkmark:after {
  content: "";
  width: 10px;
  height: 10px;
  display: block;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: 300ms ease-in-out 0s;
}
.options input[type="radio"]:checked ~ .checkmark {
  background: #21bf73;
  transition: 300ms ease-in-out 0s;
}
.options input[type="radio"]:checked ~ .checkmark:after {
  transform: translate(-50%, -50%) scale(1);
}
.btn-primary {
  background-color: #555;
  color: #ddd;
  border: 1px solid #ddd;
}
.btn-primary:hover {
  background-color: #21bf73;
  border: 1px solid #21bf73;
}
.btn-success {
  padding: 5px 25px;
  background-color: #21bf73;
}

.options.selected {
  background-color: #21bf73;
}

.options.selected .checkmark:after {
  transform: translate(-50%, -50%) scale(1);
}
</style>
