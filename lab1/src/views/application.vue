<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="app" id="app">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-4 coll-sm-12 text-center">
          <div id="learned">
            <div class="card border-primary mb-3">
              <div class="card-header">
                <a
                  class="collapsed card-link text-dark text-center"
                  data-toggle="collapse"
                  href="#collapseLearn"
                >
                  <h5 class="card-title text-dark">Dictionary</h5>
                </a>
                <h6 class="card-subtitle mb-2 text-muted">To Learn</h6>
                <form @submit.prevent="handleSearch('toLearn')">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="searchWord"
                      class="form-control"
                      id="teztControl"
                      @keyup.enter="handleSearch('toLearn')"
                      placeholder="Search..."
                    />
                  </div>
                </form>
                <h5
                  v-if="!found && searchWord.length > 0"
                  class="not-found-message"
                >
                  Word not found
                </h5>

                <div
                  v-if="selectedWordCheckToLearn && selectedWordToLearn"
                  class="card border-primary mb-3"
                >
                  <div class="card-header">
                    <h5 class="card-title">{{ selectedWordToLearn.title }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                      {{ selectedWordToLearn.translation }}
                    </h6>
                    <p class="card-text">
                      {{ selectedWordToLearn.transcription }}
                    </p>
                  </div>
                </div>
              </div>
              <div id="collapseLearn" class="collapse">
                <div class="card-body">
                  <form>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="add-word"
                        name="add-word"
                        placeholder="Word"
                        v-model="itemTitle"
                      />
                      <input
                        type="text"
                        class="form-control"
                        id="add-transl"
                        name="add-transl"
                        placeholder="Translation"
                        v-model="itemTranslation"
                      />
                      <input
                        type="text"
                        class="form-control"
                        id="add-transc"
                        name="add-transc"
                        placeholder="Transcription"
                        v-model="itemTranscription"
                      />
                      <button
                        class="btn btn-primary"
                        type="button"
                        id="subm"
                        @click="add"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                  <div class="card border-primary mb-3">
                    <div class="card-header d-flex justify-content-center">
                      <ListTable
                        :listElems="ListElementsGetToLearn"
                        @checkSelected="checkSelectedToLearn"
                        @deleteWord="delete_tolearn"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="notlearned">
            <div class="card border-primary mb-3">
              <div class="card-header">
                <a
                  class="collapsed card-link text-dark text-center"
                  data-toggle="collapse"
                  href="#collapseUnlearned"
                >
                  <h5 class="card-title text-dark">Dictionary</h5>
                </a>
                <h6 class="card-subtitle mb-2 text-muted">Learned</h6>
                <form>
                  <form @submit.prevent="handleSearch('learned')">
                    <div class="form-group">
                      <input
                        type="text"
                        v-model="searchWord"
                        class="form-control"
                        id="tetControl"
                        @keyup.enter="handleSearch('learned')"
                        placeholder="Search..."
                      />
                    </div>
                  </form>
                </form>
                <h5
                  v-if="!found && searchWord.length > 0"
                  class="not-found-message"
                >
                  Word not found
                </h5>
                <div
                  v-if="selectedWordCheckLearned && selectedWordLearned"
                  class="card border-primary mb-3"
                >
                  <div class="card-header">
                    <h5 class="card-title">{{ selectedWordLearned.title }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                      {{ selectedWordLearned.translation }}
                    </h6>
                    <p class="card-text">
                      {{ selectedWordLearned.transcription }}
                    </p>
                  </div>
                </div>
              </div>
              <div id="collapseUnlearned" class="collapse">
                <div class="card-body">
                  <div class="card border-primary mb-3">
                    <div class="card-header d-flex justify-content-center">
                      <ListTable
                        :listElems="ListElementsGetLearned"
                        @checkSelected="checkSelectedLearned"
                        @deleteWord="delete_learned"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8 coll-sm-12 text-center">
          <div id="demo" class="carousel slide" data-interval="false">
            <div id="to_ukr">
              <div class="container mt-sm-5 my-1">
                <div class="question ml-sm-5 pl-sm-5 pt-2">
                  <Choice
                    :arr="get_items($store.state.listElems.itemsToLearn)"
                    :num="get_random(4)"
                  />
                </div>
                <div class="d-flex align-items-center pt-3" id="prev">
                  <button
                    class="btn btn-primary"
                    id="refresh"
                    type="button"
                    @click="get_items($store.state.listElems.itemsToLearn)"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ListTable from "../components/ListTable.vue";
import Choice from "../components/Choice.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Application",
  components: { ListTable, Choice },
  data() {
    return {
      itemTitle: "",
      itemTranslation: "",
      itemTranscription: "",
      selectedWordCheckLearned: false,
      selectedWordCheckToLearn: false,
      selectedWordLearned: null,
      selectedWordToLearn: null,
      searchWord: "",
      found: false,
      timeoutId: null,
    };
  },
  methods: {
    handleSearch(formType) {
      if (this.searchWord.trim() !== "") {
        let englishWords;
        let selectedWord;
        let selectedWordCheck;

        if (formType === "toLearn") {
          englishWords = this.ListElementsGetToLearn;
          selectedWord = this.selectedWordToLearn;
          selectedWordCheck = this.selectedWordCheckToLearn;
        } else if (formType === "learned") {
          englishWords = this.ListElementsGetLearned;
          selectedWord = this.selectedWordLearned;
          selectedWordCheck = this.selectedWordCheckLearned;
        }

        const lowerCaseWord = this.searchWord.toLowerCase();
        const foundWords = englishWords.filter((word) =>
          word.title.toLowerCase().includes(lowerCaseWord)
        );

        selectedWord = foundWords.length > 0 ? foundWords[0] : null;
        selectedWordCheck = this.found = foundWords.length > 0;

        if (formType === "toLearn") {
          this.selectedWordToLearn = selectedWord;
          this.selectedWordCheckToLearn = selectedWordCheck;
        } else if (formType === "learned") {
          this.selectedWordLearned = selectedWord;
          this.selectedWordCheckLearned = selectedWordCheck;
        }
      } else {
        this.found = false;
      }
    },
    add() {
      if (this.itemTitle === "" || this.itemTranslation === "") {
        alert("Missing title or translation");
        return;
      }
      this.$store.dispatch("ADD", {
        itemTitle: this.itemTitle,
        itemTranslation: this.itemTranslation,
        itemTranscription: this.itemTranscription,
      });
      this.itemTitle = "";
      this.itemTranslation = "";
      this.itemTranscription = "";
    },
    checkSelectedLearned(itemId) {
      if (
        this.selectedWordCheckLearned &&
        this.selectedWordLearned === this.GetElementLearned(itemId)
      ) {
        this.selectedWordCheckLearned = false;
        this.selectedWordLearned = null;
      } else {
        this.selectedWordCheckLearned = true;
        this.selectedWordLearned = this.GetElementLearned(itemId);
      }
      this.$store.dispatch("TOGGLE_DONE_LEARNED", itemId);
    },
    checkSelectedToLearn(itemId) {
      if (
        this.selectedWordCheckToLearn &&
        this.selectedWordToLearn === this.GetElementToLearn(itemId)
      ) {
        this.selectedWordCheckToLearn = false;
        this.selectedWordToLearn = null;
      } else {
        this.selectedWordCheckToLearn = true;
        this.selectedWordToLearn = this.GetElementToLearn(itemId);
      }
      this.$store.dispatch("TOGGLE_DONE_TO_LEARN", itemId);
    },
    delete_learned(itemId) {
      this.$store.dispatch("DELETE_ITEM_LEARNED", itemId);
    },
    delete_tolearn(itemId) {
      this.$store.dispatch("DELETE_ITEM_TO_LEARN", itemId);
    },
    get_items(array) {
      //this.arr.splice(0, this.arr.length)
      console.log(array.length);
      if (array.length === 0) {
        console.log(array.length);
        return;
      }
      var randIndex,
        ind = [],
        arr = [];
      if (array.length == 0) {
        for (let i = 0; i < 4; i++) arr.push("None");
        return arr;
      }
      while (arr.length != 4) {
        if (ind.length == array.length) arr.push("None");
        randIndex = Math.floor(Math.random() * array.length);
        if (!ind.includes(randIndex)) {
          arr.push(array[randIndex]);
          ind.push(randIndex);
        }
      }
      console.log(arr);
      //this.pos = Math.floor(Math.random() * 4);
      return arr;
    },
    get_random(el) {
      return Math.floor(Math.random() * el);
    },
    GetElementToLearn: function (id) {
      return this.$store.getters.GetElementToLearn(id);
    },
    GetElementLearned: function (id) {
      return this.$store.getters.GetElementLearned(id);
    },
  },
  computed: {
    ListElementsGetLearned: function () {
      return this.$store.getters.ListElementsGetLearned;
    },
    ListElementsGetToLearn: function () {
      return this.$store.getters.ListElementsGetToLearn;
    },
  },
};
</script>

<style>
#to_ukr {
  background-color: white;
}
.back {
  background-color: white;
  border-radius: 10px;
  max-width: 700px;
}

.not-found-message {
  color: red;
}

.app {
  background-color: #007b5e;
  padding-top: 5vw;
  /* height: 100vh; */
  padding-bottom: 8vw;
}

.del-button {
  height: 15px;
  font-size: 15px;
  line-height: 0;
}
.back > p {
  font-size: 32px;
}

.question {
  width: 75%;
}
.question h5 {
  size: 64px;
  text-align: center;
}

@media (max-width: 576px) {
  .question {
    width: 100%;
    word-spacing: 2px;
  }
}
</style>
