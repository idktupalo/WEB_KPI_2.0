import { shallowMount } from "@vue/test-utils";
import LoginPage from "@/views/LoginPage.vue";
import Validations from "@/components/services/Validations";

describe("LoginPage", () => {
  let wrapper;
  let localStorageMock;

  const users = [
    { email: "test@example.com", password: "password123" },
    { email: "another@example.com", password: "password456" },
  ];
  const activeUser = { email: "test@example.com", password: "password123" };

  beforeEach(() => {
    wrapper = shallowMount(LoginPage, {
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $route: {},
        },
        stubs: {
          RouterLink: true,
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

  it("redirects to home page on successful login", () => {
    // Set up
    const email = "test@example.com";
    const password = "password123";

    // Set up Vuex mock
    const setAuthStatusMock = jest.fn();
    wrapper.vm.setAuthStatus = setAuthStatusMock;

    // Set up router mock
    const routerPushMock = jest.fn();
    wrapper.vm.$router.push = routerPushMock;

    // Set input values
    wrapper.setData({ email, password });

    // Trigger login method
    wrapper.vm.login();

    // Assertions
    expect(wrapper.vm.invalidLogin).toBe(false);
    expect(localStorageMock.getItem).toHaveBeenCalledWith("users");
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "activeUser",
      JSON.stringify(activeUser)
    );
    expect(setAuthStatusMock).toHaveBeenCalledWith(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "isAuth",
      JSON.stringify(true)
    );
    expect(routerPushMock).toHaveBeenCalledWith("/");
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("initializes with empty email and password", () => {
    expect(wrapper.vm.email).toBe("");
    expect(wrapper.vm.password).toBe("");
  });

  it("displays error message if email or password is invalid", () => {
    wrapper.vm.email = "invalid_email";
    wrapper.vm.password = "invalid_password";

    wrapper.vm.login();

    expect(wrapper.vm.invalidLogin).toBe(true);
  });

  it("clears active user on guest login", () => {
    // Set up Vuex mock
    const setAuthStatusMock = jest.fn();
    wrapper.vm.setAuthStatus = setAuthStatusMock;

    // Trigger guest login method
    wrapper.vm.loginGuest();

    // Assertions
    expect(setAuthStatusMock).toHaveBeenCalledWith(false);
  });

  it("validates email format correctly", () => {
    // Set up
    const validEmail = "test@example.com";
    const invalidEmail = "invalid_email";

    // Valid email format
    expect(Validations.validEmail(validEmail)).toBe(true);

    // Invalid email format
    expect(Validations.validEmail(invalidEmail)).toBe(false);
  });

  it("validates password length correctly", () => {
    // Set up
    const validPassword = "password123";
    const invalidPassword = "pass";

    // Valid password length
    expect(Validations.validPassword(validPassword)).toBe(true);

    // Invalid password length
    expect(Validations.validPassword(invalidPassword)).toBe(false);
  });

  it("displays the main heading", () => {
    const heading = wrapper.find("h1");
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe("Login");
  });

  it("displays the email input field", () => {
    const emailInput = wrapper.find('input[type="text"]');
    expect(emailInput.exists()).toBe(true);
    expect(emailInput.classes()).toContain("border-info");
  });

  it("displays the password input field", () => {
    const passwordInput = wrapper.find('input[type="password"]');
    expect(passwordInput.exists()).toBe(true);
    expect(passwordInput.classes()).toContain("border-info");
  });

  it("displays the login button", () => {
    const loginButton = wrapper.find("button");
    expect(loginButton.exists()).toBe(true);
    expect(loginButton.classes()).toContain("btn-info");
  });
});
