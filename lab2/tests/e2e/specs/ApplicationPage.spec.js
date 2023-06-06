describe("ApplicationPage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/application"); // Adjust the URL to match your application's route
  });

  it("should display the dictionary section", () => {
    cy.get(".card-header").should("contain", "Dictionary");
  });

  it("should handle search for words to learn and output not found message", () => {
    const searchWord = "apple";

    cy.get("#teztControl").type(searchWord);
    cy.get("form").eq(0).submit();

    cy.get(".not-found-message").should("contain", "Word not found");
  });

  it("should handle search for words to learn and output word", () => {
    const searchWord = "integer";

    cy.get("#teztControl").type(searchWord);
    cy.get("form").eq(0).submit();

    cy.get("#tolearn-title").eq(0).should("contain", "integer");
    cy.get("#tolearn-translation").should("contain", "ціле число");
    cy.get("#tolearn-transcription").should("contain", "[ in-tuh-jer ]");
  });

  it("should handle search for learned words and output not found message", () => {
    const searchWord = "apple";

    cy.get("#tetControl").type(searchWord);
    cy.get("form").eq(2).submit();

    cy.get(".not-found-message").should("contain", "Word not found");
  });

  it("should handle search for words learned and output word", () => {
    const searchWord = "evaluation";

    cy.get("#tetControl").type(searchWord);
    cy.get("form").eq(2).submit();

    cy.get("#learned-title").should("contain", "evaluation");
    cy.get("#learned-translation").should("contain", "оцінювання");
    cy.get("#learned-transcription").should(
      "contain",
      "[ ih-val-yoo-ey-shuhn ]"
    );
  });

  it("should collapse the dictionary to learn", () => {
    cy.get("#collapseLearn").should("not.have.class", "show");

    // Click on the collapse link to expand the dictionary
    cy.get("#collapsed-tolearn").click();

    // Verify that the collapse element has the "show" class
    cy.get("#collapseLearn").should("have.class", "show");

    // Click on the collapse link again to collapse the dictionary
    cy.get("#collapsed-tolearn").click();

    // Verify that the collapse element does not have the "show" class
    cy.get("#collapseLearn").should("not.have.class", "show");
  });

  it("should collapse the dictionary learned", () => {
    cy.get("#collapseLearned").should("not.have.class", "show");

    // Click on the collapse link to expand the dictionary
    cy.get("#collapsed-learned").click();

    // Verify that the collapse element has the "show" class
    cy.get("#collapseLearned").should("have.class", "show");

    // Click on the collapse link again to collapse the dictionary
    cy.get("#collapsed-learned").click();

    // Verify that the collapse element does not have the "show" class
    cy.get("#collapseLearned").should("not.have.class", "show");
  });

  it('should add a new word to the "To Learn" list', () => {
    const wordTitle = "apple";
    const wordTranslation = "яблуко";
    const wordTranscription = "/ˈæpəl/";

    cy.get("#collapsed-tolearn").click();

    cy.get("#add-word").type(wordTitle);
    cy.get("#add-transl").type(wordTranslation);
    cy.get("#add-transc").type(wordTranscription);
    cy.get("#subm").click();

    cy.get("#teztControl").type(wordTitle);
    cy.get("form").eq(0).submit();

    cy.get("#tolearn-title").should("contain", "apple");
    cy.get("#tolearn-translation").should("contain", "яблуко");
    cy.get("#tolearn-transcription").should("contain", "/ˈæpəl/");
  });

  it('should delete a word from the "To Learn" list', () => {
    cy.get("#collapsed-tolearn").click();

    // Get the initial length of the list
    let initialLength;
    cy.get(".link")
      .its("length")
      .then((length) => {
        initialLength = length;
      });
    // Delete the word
    cy.get(".del-button").first().click();

    // Check the length of the list again and compare with the initial length
    cy.get(".link").should((links) => {
      expect(links.length).to.eq(initialLength - 1);
    });
  });

  it("should select an option and check the correct answer", () => {
    cy.get("#transl_h")
      .invoke("text")
      .then((mainWord) => {
        cy.get("#tr_1")
          .invoke("text")
          .then((option1) => {
            cy.get("#tr_2")
              .invoke("text")
              .then((option2) => {
                cy.get("#tr_3")
                  .invoke("text")
                  .then((option3) => {
                    cy.get("#tr_4")
                      .invoke("text")
                      .then((option4) => {
                        if (option1 === mainWord) {
                          cy.get("#rad_1").check();
                          cy.get("#rad_1").trigger("change");
                        } else if (option2 === mainWord) {
                          cy.get("#rad_2").check();
                          cy.get("#rad_2").trigger("change");
                        } else if (option3 === mainWord) {
                          cy.get("#rad_3").check();
                          cy.get("#rad_3").trigger("change");
                        } else if (option4 === mainWord) {
                          cy.get("#rad_4").check();
                          cy.get("#rad_4").trigger("change");
                        }
                        cy.get("#check").click();
                        cy.on("window:alert", (message) => {
                          expect(message).to.equal("Successfull guess");
                        });
                      });
                  });
              });
          });
      });
  });

  it("should select an option and check the incorrect answer", () => {
    cy.get("#transl_h")
      .invoke("text")
      .then((mainWord) => {
        cy.get("#tr_1")
          .invoke("text")
          .then((option1) => {
            cy.get("#tr_2")
              .invoke("text")
              .then((option2) => {
                if (option1 != mainWord) {
                  cy.get("#rad_1").check();
                } else if (option2 != mainWord) {
                  cy.get("#rad_2").check();
                }
                cy.get("#check").click();
                cy.on("window:alert", (message) => {
                  expect(message).to.equal(
                    "Just give yourself else one try!!!"
                  );
                });
              });
          });
      });
  });

  it("should delete the word from to learn and add to the learned dictionary after a successfull guess", () => {
    cy.get("#collapsed-tolearn").click();
    cy.get("#collapsed-learned").click();

    // Get the initial length of the lists
    let initialLengthToLearn;
    let initialLengthLearned;

    cy.get("#collapseLearn .link")
      .its("length")
      .then((length) => {
        initialLengthToLearn = length;
      });

    cy.get("#collapseLearned .link")
      .its("length")
      .then((length) => {
        initialLengthLearned = length;
      });

    cy.get("#transl_h")
      .invoke("text")
      .then((mainWord) => {
        cy.get("#tr_1")
          .invoke("text")
          .then((option1) => {
            cy.get("#tr_2")
              .invoke("text")
              .then((option2) => {
                cy.get("#tr_3")
                  .invoke("text")
                  .then((option3) => {
                    cy.get("#tr_4")
                      .invoke("text")
                      .then((option4) => {
                        let selectedOptionId;
                        console.log("Opitons list:");
                        if (option1 === mainWord) {
                          console.log(option1);
                          console.log(mainWord);
                          selectedOptionId = "#rad_1";
                        } else if (option2 === mainWord) {
                          console.log(option2);
                          console.log(mainWord);
                          selectedOptionId = "#rad_2";
                        } else if (option3 === mainWord) {
                          console.log(option3);
                          console.log(mainWord);
                          selectedOptionId = "#rad_3";
                        } else if (option4 === mainWord) {
                          console.log(option4);
                          console.log(mainWord);
                          selectedOptionId = "#rad_4";
                        }

                        console.log(selectedOptionId);
                        // Select the correct option
                        cy.get(selectedOptionId).check();

                        // Click the Check button
                        cy.get("#check").click();

                        // Assert the success message
                        cy.on("window:alert", (message) => {
                          expect(message).to.equal("Successfull guess");
                        });
                      });
                  });
              });
          });
      });

    // Check the length of the lists again and compare with the initial length
    cy.get("#collapseLearned .link").should((links) => {
      expect(links.length).to.eq(initialLengthLearned + 1);
    });

    cy.get("#collapseLearn .link").should((links) => {
      expect(links.length).to.eq(initialLengthToLearn - 1);
    });
  });
});
