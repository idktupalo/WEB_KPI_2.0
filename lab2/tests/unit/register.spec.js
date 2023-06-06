import { shallowMount } from "@vue/test-utils";
import RegisterPage from "@/views/RegisterPage.vue";
import { router } from "@/router/router";

describe("RegisterPage", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RegisterPage, {
      global: {
        plugins: [router],
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
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("submits the form when the button is clicked", async () => {
    wrapper.setData({
      email: "test@example.com",
      username: "testuser",
      birthday: "2000-01-01",
      sex: "male",
      password: "password123",
    });

    wrapper.vm.handleSubmit(); // Call the handleSubmit method directly
    await wrapper.vm.$nextTick(); // Wait for the next tick
    expect(wrapper.vm.submitted).toBe(true);
  });

  it("validates the email field", async () => {
    const emailInput = wrapper.find('input[type="text"]');
    await emailInput.setValue("invalid-email");
    await emailInput.trigger("blur");
    expect(wrapper.vm.emailBlured).toBe(true);
    expect(emailInput.classes()).toContain("is-invalid");
  });

  it("validates the username field", async () => {
    const usernameInput = wrapper.find('input[type="text"]');
    await usernameInput.setValue("John123!");
    await usernameInput.trigger("blur");
    expect(wrapper.vm.usernameBlured).toBe(false);
    expect(usernameInput.classes()).toContain("is-invalid");
  });

  it("validates the birthday field", async () => {
    const birthdayInput = wrapper.find('input[type="date"]');
    await birthdayInput.setValue("2023-06-02");
    await birthdayInput.trigger("blur");
    expect(wrapper.vm.birthdayBlured).toBe(true);
    expect(birthdayInput.classes()).toContain("form-control");
  });

  it("validates the sex field", async () => {
    const sexInputs = wrapper.findAll('input[type="radio"]');
    await sexInputs[0].setChecked(true);
    await sexInputs[1].setChecked(true);
    await sexInputs[2].setChecked(true);
    await sexInputs[2].trigger("change");
    expect(wrapper.vm.sex).toBe("other");
  });

  it("validates the password field", async () => {
    const passwordInput = wrapper.find('input[type="password"]');
    await passwordInput.setValue("pass");
    await passwordInput.trigger("blur");
    expect(wrapper.vm.passwordBlured).toBe(true);
    expect(passwordInput.classes()).toContain("is-invalid");
  });

  it("redirects to login page on successful registration", async () => {
    // Mock the user data
    const userData = {
      email: "test@example.com",
      password: "password123",
      username: "TestUser",
      birthday: "1990-01-01",
      sex: "male",
    };

    // Mock the local storage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    Object.defineProperty(global, "localStorage", {
      value: localStorageMock,
    });

    // Set the user data in the component
    wrapper.setData(userData);

    // Trigger the registration
    await wrapper.vm.handleSubmit();

    // Assertions
    expect(wrapper.vm.submitted).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "users",
      expect.any(String)
    );
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/login");
  });
});
