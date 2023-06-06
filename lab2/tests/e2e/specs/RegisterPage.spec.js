describe("Register Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/register"); // Assuming the register page URL is '/register'
  });

  it("displays validation error for invalid email", () => {
    cy.get('input[type="text"]').first().type("invalid-email");
    cy.get(".invalid-feedback").should("contain", "A valid email is required!");
  });

  it("displays validation error for invalid username", () => {
    cy.get('input[type="text"]').eq(1).type("inv@lid");
    cy.get(".invalid-feedback").should(
      "contain",
      "A valid username is required!"
    );
  });

  it("displays validation error for invalid birthday", () => {
    cy.get('input[type="date"]').type("2023-06-03");
    cy.get(".invalid-feedback").should(
      "contain",
      "A valid birthday is required!"
    );
  });

  it("displays validation error for not selecting sex", () => {
    cy.get('input[type="radio"]').should("not.be.checked");
    cy.get(".invalid-feedback").should("contain", "Please select your sex!");
  });

  it("displays validation error for invalid password", () => {
    cy.get('input[type="password"]').type("pass");
    cy.get('input[type="password"]')
      .next(".invalid-feedback")
      .should("contain", "Password must be 8 characters!");
  });

  it("submits the form with valid input", () => {
    cy.get('input[type="text"]').eq(0).type("valid-email");
    cy.get('input[type="text"]').eq(1).type("valid-username");
    cy.get('input[type="date"]').type("1990-01-01");
    cy.get('input[type="radio"]').check("male");
    cy.get('input[type="password"]').type("valid-password");
    cy.get("button").click();
    // Add assertions or further actions after the form submission
  });

  it("displays validation error for empty input fields", () => {
    cy.get("button").click(); // Click the submit button without entering any data
    cy.get(".invalid-feedback").should("have.length", 5); // Check that all validation error messages are displayed
  });

  it("redirects to login page after successful registration", () => {
    cy.get('input[type="text"]').eq(0).type("validemail@some.com");
    cy.get('input[type="text"]').eq(1).type("valid username");
    cy.get('input[type="date"]').type("1990-01-01");
    cy.get('input[type="radio"]').check("male");
    cy.get('input[type="password"]').type("valid-password");
    cy.get("button").click();
    cy.url().should("include", "/login");
  });
});
