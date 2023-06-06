<template>
  <section class="app" id="app">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-4 coll-sm-12 text-center">
          <div id="tolearn">
            <div class="card border-primary mb-3">
              <div class="card-header">
                <a
                  id="collapsed-tolearn"
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
                      :value="searchWordToLearn"
                      @input="searchWordToLearn = $event.target.value"
                      class="form-control"
                      id="teztControl"
                      @keyup.enter="handleSearch('toLearn')"
                      placeholder="Search and press enter..."
                    />
                  </div>
                </form>
                <h5
                  v-if="
                    !foundWord &&
                    searchWordToLearn.length > 0 &&
                    searchWordToLearn == currentWordToLearn
                  "
                  class="not-found-message"
                >
                  Word not found
                </h5>

                <div
                  v-if="
                    selectedWordCheckToLearn &&
                    selectedWordToLearn &&
                    searchWordToLearn == currentWordToLearn
                  "
                  class="card border-primary mb-3"
                >
                  <div class="card-header">
                    <h5 id="tolearn-title" class="card-title">
                      {{ selectedWordToLearn.title }}
                    </h5>
                    <h6
                      id="tolearn-translation"
                      class="card-subtitle mb-2 text-muted"
                    >
                      {{ selectedWordToLearn.translation }}
                    </h6>
                    <p id="tolearn-transcription" class="card-text">
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
                        :value="itemTitle"
                        @input="itemTitle = $event.target.value"
                      />
                      <input
                        type="text"
                        class="form-control"
                        id="add-transl"
                        name="add-transl"
                        placeholder="Translation"
                        :value="itemTranslation"
                        @input="itemTranslation = $event.target.value"
                      />
                      <input
                        type="text"
                        class="form-control"
                        id="add-transc"
                        name="add-transc"
                        placeholder="Transcription"
                        :value="itemTranscription"
                        @input="itemTranscription = $event.target.value"
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
                        :listElems="listElementsGetToLearn"
                        @checkSelected="checkSelectedToLearn"
                        @deleteWord="deleteToLearn"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="learned">
            <div class="card border-primary mb-3">
              <div class="card-header">
                <a
                  id="collapsed-learned"
                  class="collapsed card-link text-dark text-center"
                  data-toggle="collapse"
                  href="#collapseLearned"
                >
                  <h5 class="card-title text-dark">Dictionary</h5>
                </a>
                <h6 class="card-subtitle mb-2 text-muted">Learned</h6>
                <form @submit.prevent="handleSearch('learned')">
                  <div class="form-group">
                    <input
                      type="text"
                      :value="searchWordLearned"
                      @input="searchWordLearned = $event.target.value"
                      class="form-control"
                      id="tetControl"
                      @keyup.enter="handleSearch('learned')"
                      placeholder="Search and press enter..."
                    />
                  </div>
                </form>
                <h5
                  v-if="
                    !foundWord &&
                    searchWordLearned.length > 0 &&
                    searchWordLearned == currentWordLearned
                  "
                  class="not-found-message"
                >
                  Word not found
                </h5>
                <div
                  v-if="
                    selectedWordCheckLearned &&
                    selectedWordLearned &&
                    searchWordLearned == currentWordLearned
                  "
                  class="card border-primary mb-3"
                >
                  <div class="card-header">
                    <h5 id="learned-title" class="card-title">
                      {{ selectedWordLearned.title }}
                    </h5>
                    <h6
                      id="learned-translation"
                      class="card-subtitle mb-2 text-muted"
                    >
                      {{ selectedWordLearned.translation }}
                    </h6>
                    <p id="learned-transcription" class="card-text">
                      {{ selectedWordLearned.transcription }}
                    </p>
                  </div>
                </div>
              </div>
              <div id="collapseLearned" class="collapse">
                <div class="card-body">
                  <div class="card border-primary mb-3">
                    <div class="card-header d-flex justify-content-center">
                      <ListTable
                        :listElems="listElementsGetLearned"
                        @checkSelected="checkSelectedLearned"
                        @deleteWord="deleteLearned"
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
                    :arr="computedItemsToLearn"
                    :num="randomNumber"
                    @deleteWord="deleteToLearn"
                  />
                </div>
                <div class="d-flex align-items-center pt-3" id="prev">
                  <button
                    class="btn btn-primary"
                    id="refresh"
                    type="button"
                    @click="refresh"
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
      searchWordLearned: "",
      searchWordToLearn: "",
      foundWord: false,
      currentWordToLearn: null,
      currentWordLearned: null,
      randomNumber: null,
      computedItemsToLearn: [],
    };
  },
  created() {
    this.computedItemsToLearn = this.getComputedItemsToLearn;
  },
  methods: {
    handleSearch(formType) {
      this.currentWordToLearn = this.searchWordToLearn;
      this.currentWordLearned = this.searchWordLearned;
      let searchWord;
      if (formType == "toLearn") searchWord = this.searchWordToLearn;
      else if (formType == "learned") searchWord = this.searchWordLearned;
      if (searchWord.trim() !== "") {
        let englishWords;
        let selectedWord;
        let selectedWordCheck;
        if (formType === "toLearn") {
          englishWords = this.listElementsGetToLearn;
          selectedWord = this.selectedWordToLearn;
          selectedWordCheck = this.selectedWordCheckToLearn;
        } else if (formType === "learned") {
          englishWords = this.listElementsGetLearned;
          selectedWord = this.selectedWordLearned;
          selectedWordCheck = this.selectedWordCheckLearned;
        }

        console.log("EnglishWords: " + englishWords);
        console.log(englishWords[0]);
        const lowerCaseWord = searchWord.toLowerCase();
        console.log("searchWord: " + lowerCaseWord);
        const foundWords = englishWords.filter((word) =>
          word.title.toLowerCase().includes(lowerCaseWord)
        );
        selectedWord = foundWords.length > 0 ? foundWords[0] : null;
        selectedWordCheck = this.foundWord = foundWords.length > 0;
        if (formType === "toLearn") {
          this.selectedWordToLearn = selectedWord;
          this.selectedWordCheckToLearn = selectedWordCheck;
        } else if (formType === "learned") {
          this.selectedWordLearned = selectedWord;
          this.selectedWordCheckLearned = selectedWordCheck;
        }
      } else {
        this.foundWord = false;
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
    refresh() {
      // Generate a new random number to select a different word from the array
      this.randomNumber = this.getRandom(4);
      this.computedItemsToLearn = this.getItems(
        this.$store.state.listElems.itemsToLearn
      );
    },
    checkSelectedLearned(itemId) {
      if (
        this.selectedWordCheckLearned &&
        this.selectedWordLearned === this.getElementLearned(itemId)
      ) {
        this.selectedWordCheckLearned = false;
        this.selectedWordLearned = null;
      } else {
        this.selectedWordCheckLearned = true;
        this.selectedWordLearned = this.getElementLearned(itemId);
      }
      this.$store.dispatch("TOGGLE_DONE_LEARNED", itemId);
    },
    checkSelectedToLearn(itemId) {
      if (
        this.selectedWordCheckToLearn &&
        this.selectedWordToLearn === this.getElementToLearn(itemId)
      ) {
        this.selectedWordCheckToLearn = false;
        this.selectedWordToLearn = null;
      } else {
        this.selectedWordCheckToLearn = true;
        this.selectedWordToLearn = this.getElementToLearn(itemId);
      }
      this.$store.dispatch("TOGGLE_DONE_TO_LEARN", itemId);
    },
    deleteLearned(itemId) {
      this.$store.dispatch("DELETE_ITEM_LEARNED", itemId);
    },
    deleteToLearn(itemId) {
      this.$store.dispatch("DELETE_ITEM_TO_LEARN", itemId);
      this.refresh();
    },
    getItems(array) {
      var randIndex,
        ind = [],
        arr = [];

      // Generate the random number and store it in the data property
      this.randomNumber = this.getRandom(4);

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
      return arr;
    },
    getRandom(el) {
      return Math.floor(Math.random() * el);
    },
    getElementToLearn: function (id) {
      return this.$store.getters.GetElementToLearn(id);
    },
    getElementLearned: function (id) {
      return this.$store.getters.GetElementLearned(id);
    },
  },
  computed: {
    listElementsGetLearned: function () {
      return this.$store.getters.ListElementsGetLearned;
    },
    listElementsGetToLearn: function () {
      return this.$store.getters.ListElementsGetToLearn;
    },
    getComputedItemsToLearn() {
      return this.getItems(this.$store.state.listElems.itemsToLearn);
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
