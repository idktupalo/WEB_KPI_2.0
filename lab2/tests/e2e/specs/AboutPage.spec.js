describe("AboutPage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/about");
  });

  it("renders quick links correctly", () => {
    cy.get("li").contains("Home").should("exist");
    cy.get("li").contains("Profile").should("exist");
    cy.get("li").contains("App").should("exist");
    cy.get("li").contains("Register").should("exist");
    cy.get("li").contains("Login").should("exist");
  });

  it("renders the about section with the correct text", () => {
    cy.contains("About").should("exist");
    cy.contains("Faraway").should("exist");
    cy.contains(
      'Faraway" is a tool for controlling and consolidating learned foreign words, which allows users to effectively learn new words and expand their vocabulary. English is the main and only language of words that contain a translation into Ukrainian. The application offers three main work blocks: a dictionary for words to study, a dictionary of learned words and a quiz to consolidate knowledge.'
    ).should("exist");
  });

  it("renders the footer with the correct copyright text", () => {
    cy.contains("Copyright © farawaystudy.com 2023").should("exist");
  });

  it("renders the quick links section correctly", () => {
    cy.get("#footer").find(".quick-links").should("exist");
    cy.get(".quick-links").find("li").should("have.length", 5);
  });

  it("renders the image correctly", () => {
    cy.get(".imgres img")
      .should("exist")
      .and("have.attr", "src")
      .and("include", "png");
  });

  it("renders the about section heading correctly", () => {
    cy.get(".page-section-heading")
      .contains("About")
      .should("exist")
      .and("have.class", "text-white");
  });

  it("renders the about section with the correct text", () => {
    cy.get(".lead")
      .invoke("text")
      .should(
        "contain",
        '"Faraway" is a tool for controlling and consolidating learned foreign words'
      );
  });

  it("renders the social media icon correctly", () => {
    cy.get(".social")
      .find("li")
      .should("have.class", "list-inline-item")
      .and("have.length", 1)
      .within(() => {
        cy.get("a")
          .should("have.attr", "href", "#")
          .and("have.attr", "target", "_blank");
        cy.get("i").should("have.class", "fa fa-envelope");
      });
  });
});
