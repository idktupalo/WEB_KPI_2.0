import { shallowMount } from "@vue/test-utils";
import ApplicationPage from "@/views/ApplicationPage.vue";
import { wordsToLearn, wordsLearn } from "@/data/words";
import Choice from "@/components/Choice.vue";
import ListTable from "@/components/ListTable.vue";
describe("ApplicationPage", () => {
  // eslint-disable-next-line no-unused-vars
  let store;
  let wrapper;

  beforeEach(() => {
    store = {
      state: {
        listElems: {
          itemsToLearn: wordsToLearn,
          itemsLearned: wordsLearn,
        },
      },
      getters: {
        ListElementsGetToLearn: wordsToLearn,
        ListElementsGetLearned: wordsLearn,
      },
      dispatch: jest.fn(),
    };

    wrapper = shallowMount(ApplicationPage, {
      global: {
        mocks: {
          $store: store,
          $t: () => {},
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("displays the dictionary section", () => {
    const dictionarySection = wrapper.find("#learned");
    expect(dictionarySection.exists()).toBe(true);
  });

  test("handles search in 'toLearn' form", () => {
    const formType = "toLearn";
    wrapper.setData({
      searchWordToLearn: "example",
      wordsToLearn: wordsLearn,
    });
    wrapper.vm.handleSearch(formType);
    expect(wrapper.vm.currentWordToLearn).toBe("example");
    expect(wrapper.vm.currentWordLearned).toBe("");
    expect(wrapper.vm.selectedWordToLearn).toBe(null);
    expect(wrapper.vm.selectedWordCheckToLearn).toBe(false);
    expect(wrapper.vm.foundWord).toBe(false);
  });

  it("updates searchWordToLearn data property on input", async () => {
    const input = wrapper.find("input#teztControl");
    await input.setValue("search term");
    expect(wrapper.vm.searchWordToLearn).toBe("search term");
  });

  it('displays "Word not found" message when word is not found', async () => {
    wrapper.setData({ searchWordToLearn: "not found" });
    await wrapper.vm.handleSearch("toLearn");
    const notFoundMessage = wrapper.find(".not-found-message");
    expect(notFoundMessage.exists()).toBe(true);
    expect(notFoundMessage.text()).toBe("Word not found");
  });

  it("handles search in 'learned' form", () => {
    const formType = "learned";
    wrapper.setData({
      searchWordLearned: "example",
      wordsLearned: wordsLearn,
    });
    wrapper.vm.handleSearch(formType);
    expect(wrapper.vm.currentWordLearned).toBe("example");
    expect(wrapper.vm.currentWordToLearn).toBe("");
    expect(wrapper.vm.selectedWordLearned).toBe(null);
    expect(wrapper.vm.selectedWordCheckLearned).toBe(false);
    expect(wrapper.vm.foundWord).toBe(false);
  });

  it("adds a new word to the list", () => {
    wrapper.setData({
      itemTitle: "New Word",
      itemTranslation: "Translation",
      itemTranscription: "Transcription",
    });
    wrapper.vm.add();
    expect(store.dispatch).toHaveBeenCalledWith("ADD", {
      itemTitle: "New Word",
      itemTranslation: "Translation",
      itemTranscription: "Transcription",
    });
    expect(wrapper.vm.itemTitle).toBe("");
    expect(wrapper.vm.itemTranslation).toBe("");
    expect(wrapper.vm.itemTranscription).toBe("");
  });

  // Add more test cases to cover other components and functionality
});

describe("Choice", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(Choice, {
      propsData: {
        arr: ["Option 1", "Option 2", "Option 3", "Option 4"],
        num: 2,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('emits "choice" event on button click', () => {
    const wrapper = shallowMount(Choice, {
      propsData: {
        arr: [
          { title: "Option 1", translation: "Translation 1" },
          { title: "Option 2", translation: "Translation 2" },
          { title: "Option 3", translation: "Translation 3" },
          { title: "Option 4", translation: "Translation 4" },
        ],
        num: 2,
      },
    });

    const checkButton = wrapper.find("#check");
    checkButton.trigger("click");

    expect(wrapper.emitted("choice")).toBeTruthy();
  });
});

describe("ListTable", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(ListTable, {
      propsData: {
        listElems: [
          {
            id: 1,
            title: "Word 1",
            translation: "Translation 1",
            transcription: "Transcription 1",
          },
          {
            id: 2,
            title: "Word 2",
            translation: "Translation 2",
            transcription: "Transcription 2",
          },
        ],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('emits "checkSelected" event on button click', () => {
    const wrapper = shallowMount(ListTable, {
      propsData: {
        listElems: [
          {
            id: 1,
            title: "Word 1",
            translation: "Translation 1",
            transcription: "Transcription 1",
          },
          {
            id: 2,
            title: "Word 2",
            translation: "Translation 2",
            transcription: "Transcription 2",
          },
        ],
      },
    });

    const button = wrapper.find(".link");
    button.trigger("click");

    expect(wrapper.emitted("checkSelected")).toBeTruthy();
    expect(wrapper.emitted("checkSelected")[0][0]).toBe(1);
  });

  it('emits "deleteWord" event on delete button click', () => {
    const wrapper = shallowMount(ListTable, {
      propsData: {
        listElems: [
          {
            id: 1,
            title: "Word 1",
            translation: "Translation 1",
            transcription: "Transcription 1",
          },
          {
            id: 2,
            title: "Word 2",
            translation: "Translation 2",
            transcription: "Transcription 2",
          },
        ],
      },
    });

    const deleteButton = wrapper.find(".del-button");
    deleteButton.trigger("click");

    expect(wrapper.emitted("deleteWord")).toBeTruthy();
    expect(wrapper.emitted("deleteWord")[0][0]).toBe(1);
  });
});
