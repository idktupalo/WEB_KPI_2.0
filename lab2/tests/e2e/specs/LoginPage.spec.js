// https://docs.cypress.io/api/table-of-contents

describe("LoginPage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/login");
  });

  it("should display the login form", () => {
    cy.get("h1").should("contain", "Login");
    cy.get("input[type='text']").should("have.attr", "placeholder", "Email");
    cy.get("input[type='password']").should(
      "have.attr",
      "placeholder",
      "●●●●●●●●"
    );
    cy.get("button").should("contain", "Login");
  });

  it("should log in successfully with valid credentials", () => {
    cy.window().then((win) => {
      // Manually store user information in local storage
      win.localStorage.setItem(
        "users",
        JSON.stringify([
          {
            email: "user@example.com",
            password: "password",
          },
          // Add more user objects if needed
        ])
      );
    });

    cy.get("input[type='text']").type("user@example.com");
    cy.get("input[type='password']").type("password");
    cy.get("button").click();
    cy.url().should("eq", "http://localhost:8080/");
    cy.get(".welcome-txt").should("contain", "Faraway");
  });

  it("should display an error message with invalid credentials", () => {
    cy.get("input[type='text']").type("invalid@example.com");
    cy.get("input[type='password']").type("invalidpassword");
    cy.get("button").click();
    cy.get(".text-danger").should("contain", "Invalid login or password");
  });

  it("should log in as a guest", () => {
    cy.get("input[type='submit']").click();
    cy.url().should("eq", "http://localhost:8080/");
    cy.get(".welcome-txt").should("contain", "Faraway");
  });

  it("should redirect to the registration page when clicking 'Register Now'", () => {
    cy.contains("Register Now!").click();
    cy.url().should("eq", "http://localhost:8080/register");
    cy.get("h4").should("contain", "Register Now");
  });

  it("should display an error message when the email field is empty", () => {
    cy.get("input[type='password']").type("password");
    cy.get("button").click();
    cy.get(".text-danger").should("contain", "Invalid login or password");
  });

  it("should display an error message when the password field is empty", () => {
    cy.get("input[type='text']").type("user@example.com");
    cy.get("button").click();
    cy.get(".text-danger").should("contain", "Invalid login or password");
  });

  it("should display an error message when both email and password fields are empty", () => {
    cy.get("button").click();
    cy.get(".text-danger").should("contain", "Invalid login or password");
  });

  it("should not display an error message when the email and password fields are valid", () => {
    cy.window().then((win) => {
      win.localStorage.setItem(
        "users",
        JSON.stringify([
          {
            email: "user@example.com",
            password: "password",
          },
        ])
      );
    });

    cy.get("input[type='text']").type("user@example.com");
    cy.get("input[type='password']").type("password");
    cy.get("button").click();
    cy.get(".text-danger").should("not.exist");
  });
});
