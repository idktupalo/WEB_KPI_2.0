import { createStore } from "vuex";
import ListElements from "../cls/model/ListElements.js";
import ListElementBackend from "../cls/model/backend/ListElementBackend.js";
// import ListElements from "@/cls/model/ListElements.js";
// import ListElementBackend from "@/cls/model/backend/ListElementBackend.js";
import { wordsLearn, wordsToLearn } from "../data/words.js";

export default createStore({
  state: {
    listElems: [],
    isAuth: false, // Initial value of the authentication status
  },
  getters: {
    isAuth(state) {
      return state.isAuth;
    },
    ListElementsGetToLearn(state) {
      // console.log("--------------------------------------TOLEAR/N");
      // console.log(state.listElems.getItemsToLearn());
      return state.listElems.getItemsToLearn();
    },
    ListElementsGetLearned(state) {
      // console.log("--------------------------------------LEARNED/N");
      // console.log(state.listElems.getItemsLearned());
      return state.listElems.getItemsLearned();
    },
    GetElementToLearn: (state) => (id) => {
      return state.listElems.getItemToLearn(id);
    },
    GetElementLearned: (state) => (id) => {
      return state.listElems.getItemLearned(id);
    },
  },
  mutations: {
    setIsAuth(state, value) {
      state.isAuth = value;
    },
    // cannot be asynchronous! (always sync)
    INIT: (state, storage) => {
      if (storage === "vuex") {
        state.listElems = new ListElements();
      }
      if (storage === "backend") state.listElems = new ListElementBackend();

      wordsLearn.forEach((word) => {
        state.listElems.add_learned(
          word.title,
          word.translation,
          word.transcription
        );
      });

      wordsToLearn.forEach((word) => {
        state.listElems.add_tolearn(
          word.title,
          word.translation,
          word.transcription
        );
      });
    },
    ADD: (state, { itemTitle, itemTranslation, itemTranscription }) => {
      state.listElems.add_tolearn(
        itemTitle,
        itemTranslation,
        itemTranscription
      );
    },
    ADD_LEARNED: (state, { itemTitle, itemTranslation, itemTranscription }) => {
      state.listElems.add_learned(
        itemTitle,
        itemTranslation,
        itemTranscription
      );
    },
    TOGGLE_DONE_TO_LEARN: (state, listElemId) => {
      state.listElems.checkSelectedToLearn([listElemId]);
    },
    TOGGLE_DONE_LEARNED: (state, listElemId) => {
      state.listElems.checkSelectedLearned([listElemId]);
    },
    DELETE_ITEM_TO_LEARN: (state, listElemId) => {
      state.listElems.delete_tolearn(listElemId);
    },
    DELETE_ITEM_LEARNED: (state, listElemId) => {
      state.listElems.delete_learned(listElemId);
    },
  },
  actions: {
    setAuthStatus({ commit }, value) {
      commit("setIsAuth", value);
    },
    // can be asynchronous!
    INIT: (context, storage) => {
      context.commit("INIT", storage);
    },
    ADD: (context, { itemTitle, itemTranslation, itemTranscription }) => {
      context.commit("ADD", {
        itemTitle,
        itemTranslation,
        itemTranscription,
      });
    },
    ADD_LEARNED: (
      context,
      { itemTitle, itemTranslation, itemTranscription }
    ) => {
      context.commit("ADD_LEARNED", {
        itemTitle,
        itemTranslation,
        itemTranscription,
      });
    },
    TOGGLE_DONE_TO_LEARN: (context, listElemId) => {
      context.commit("TOGGLE_DONE_TO_LEARN", listElemId);
    },
    TOGGLE_DONE_LEARNED: (context, listElemId) => {
      context.commit("TOGGLE_DONE_LEARNED", listElemId);
    },
    DELETE_ITEM_TO_LEARN: (context, listElemId) => {
      context.commit("DELETE_ITEM_TO_LEARN", listElemId);
    },
    DELETE_ITEM_LEARNED: (context, listElemId) => {
      context.commit("DELETE_ITEM_LEARNED", listElemId);
    },
  },
});
