import { createStore } from "vuex";
import ListElements from "@/cls/model/ListElements.js";
import ListElementBackend from "@/cls/model/backend/ListElementBackend.js";
import { wordsLearn, wordsToLearn } from "../data/words.js";
import auth from "./modules/auth/index";

export default createStore({
  modules: {
    auth,
  },
  state: {
    listElems: [],
  },
  getters: {
    ListElementsGetToLearn(state) {
      return state.listElems.getItemsToLearn();
    },
    ListElementsGetLearned(state) {
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
    // cannot be asynchronous! (always sync)
    INIT: (state, storage) => {
      if (storage === "vuex") {
        state.listElems = new ListElements();
      }
      if (storage === "backend") state.listElems = new ListElementBackend();

      wordsLearn.forEach((word) => {
        state.listElems.add_learned(
          word.english,
          word.translation,
          word.transcription
        );
      });

      wordsToLearn.forEach((word) => {
        state.listElems.add_tolearn(
          word.english,
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
