import { shallowMount } from "@vue/test-utils";
import ProfilePage from "@/views/ProfilePage.vue";

describe("ProfilePage", () => {
  let wrapper;
  let store;
  let localStorageMock;

  const users = [
    {
      email: "vasylmeliukh430@gmail.com",
      password: "123654789",
      username: "Vasyl Meliukh",
      birthday: "2001-01-01",
      sex: "male",
    },
  ];
  const activeUser = {
    email: "vasylmeliukh430@gmail.com",
    password: "123654789",
    username: "Vasyl Meliukh",
    birthday: "2001-01-01",
    sex: "male",
  };

  beforeEach(() => {
    store = {
      getters: {
        isAuth: true,
        ListElementsGetToLearn: [],
        ListElementsGetLearned: [],
      },
      isAuth: true,
    };

    wrapper = shallowMount(ProfilePage, {
      global: {
        mocks: {
          $store: store,
        },
      },
    });

    localStorageMock = {
      getItem: jest.fn((key) => {
        if (key === "activeUser") {
          return JSON.stringify(activeUser);
        } else if (key === "users") {
          return JSON.stringify(users);
        }
        return null;
      }),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };

    Object.defineProperty(global, "localStorage", {
      value: localStorageMock,
      configurable: true,
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the profile image", () => {
    expect(wrapper.find("img").exists()).toBe(true);
  });

  it("displays the username correctly", () => {
    wrapper.setData({ activeUser });

    expect(wrapper.find(".gg_n").text()).toBe("Vasyl Meliukh");
  });

  it("displays the achievements section", () => {
    expect(wrapper.find(".achievement").exists()).toBe(true);
  });

  it("displays the learned words progress bar", () => {
    expect(wrapper.find(".progress-bar-success").exists()).toBe(true);
  });

  it("displays the to learn words progress bar", () => {
    expect(wrapper.find(".progress-bar-success").exists()).toBe(true);
  });

  it("displays the user information in read-only mode", () => {
    expect(wrapper.find(".btn-edit").exists()).toBe(true);
    expect(wrapper.find(".btn-save").exists()).toBe(false);
    expect(wrapper.find("#g_name_txt").text()).toBe("Vasyl Meliukh");
    expect(wrapper.find("#g_email_txt").text()).toBe(
      "vasylmeliukh430@gmail.com"
    );
    expect(wrapper.find("#g_date").text()).toBe("2001-01-01");
    expect(wrapper.find("#g_gender_txt").text()).toBe("male");
  });

  it("switches to edit mode when clicking the Edit button", () => {
    expect(wrapper.vm.isEditingAllFields).toBe(false);

    wrapper.find(".btn-edit").trigger("click");

    expect(wrapper.vm.isEditingAllFields).toBe(true);
  });
});
