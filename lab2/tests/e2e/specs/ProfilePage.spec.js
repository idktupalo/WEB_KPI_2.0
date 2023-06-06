describe("Profile Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/profile"); // Assuming the profile page is accessible via the "/profile" URL
  });

  // Assuming you have an authenticated user with the following information
  const user = {
    username: "JohnDoe",
    email: "john@example.com",
    birthday: "1990-01-01",
    sex: "Male",
    password: "123456789",
  };

  it("displays guest information when not authenticated", () => {
    cy.contains("h3", "Guest").should("exist");
    cy.get("#g_name_txt").should("contain", "Guest");
    cy.get("#g_email_txt").should("contain", "guest@example.com");
    cy.get("#g_date").should("contain", "N/A");
    cy.get("#g_gender_txt").should("contain", "N/A");
  });

  it("displays authenticated user information when authenticated", () => {
    localStorage.setItem("activeUser", JSON.stringify(user));

    cy.reload();

    cy.contains("h3", user.username).should("exist");
    cy.get("#g_name_txt").should("contain", user.username);
    cy.get("#g_email_txt").should("contain", user.email);
    cy.get("#g_date").should("contain", user.birthday);
    cy.get("#g_gender_txt").should("contain", user.sex);
  });

  it("allows editing user information when authenticated", () => {
    localStorage.setItem("activeUser", JSON.stringify(user));
    localStorage.setItem("isAuth", JSON.stringify(true));

    cy.reload();

    // Click the Edit button
    cy.contains("button", "Edit").click();

    // // Modify the user information
    cy.get("#g_name_input input").clear().type("JaneDoe");
    cy.get("#g_email_input input").clear().type("jane@example.com");
    cy.get("#g_date_input input").clear().type("1995-01-01");
    cy.get("#g_gender_input input").clear().type("Female");
    cy.get("#g_password_input input").clear().type("qwertyui");

    // // Save the changes
    cy.contains("button", "Save").click();

    // // Verify that the updated information is displayed
    cy.get("#g_name_txt").should("contain", "JaneDoe");
    cy.get("#g_email_txt").should("contain", "jane@example.com");
    cy.get("#g_date").should("contain", "1995-01-01");
    cy.get("#g_gender_txt").should("contain", "Female");
  });

  it("doesn't save edited user information when validation failed", () => {
    localStorage.setItem("activeUser", JSON.stringify(user));
    localStorage.setItem("isAuth", JSON.stringify(true));

    cy.reload();

    // Click the Edit button
    cy.contains("button", "Edit").click();

    // // Modify the user information
    cy.get("#g_name_input input").clear().type("123");
    cy.get("#g_email_input input").clear().type("jane@example.com");
    cy.get("#g_date_input input").clear().type("1995-01-01");
    cy.get("#g_gender_input input").clear().type("Female");
    cy.get("#g_password_input input").clear().type("qwertyui");

    // // Save the changes
    cy.contains("button", "Save").click();

    // // Verify that the updated information is displayed
    cy.get("#g_name_txt").should("contain", user.username);
    cy.get("#g_email_txt").should("contain", user.email);
    cy.get("#g_date").should("contain", user.birthday);
    cy.get("#g_gender_txt").should("contain", user.sex);
  });

  it("displays validation error for invalid username", () => {
    localStorage.setItem("activeUser", JSON.stringify(user));
    localStorage.setItem("isAuth", JSON.stringify(true));

    cy.reload();

    // Click the Edit button
    cy.contains("button", "Edit").click();

    // // Modify the user information
    cy.get("#g_name_input input").clear().type("123");

    cy.get("#g_name_input .invalid-feedback").should(
      "contain",
      "A valid username is required!"
    );
  });

  it("displays validation error for invalid email", () => {
    localStorage.setItem("activeUser", JSON.stringify(user));
    localStorage.setItem("isAuth", JSON.stringify(true));

    cy.reload();

    // Click the Edit button
    cy.contains("button", "Edit").click();

    // // Modify the user information
    cy.get("#g_email_input input").clear().type("123");

    cy.get("#g_email_input .invalid-feedback").should(
      "contain",
      "A valid email is required!"
    );
  });

  it("displays validation error for invalid birthday", () => {
    localStorage.setItem("activeUser", JSON.stringify(user));
    localStorage.setItem("isAuth", JSON.stringify(true));

    cy.reload();

    // Click the Edit button
    cy.contains("button", "Edit").click();

    // // Modify the user information
    cy.get("#g_date_input input").clear().type("123");

    cy.get("#g_date_input .invalid-feedback").should(
      "contain",
      "A valid date is required!"
    );
  });

  it("displays validation error for invalid sex", () => {
    localStorage.setItem("activeUser", JSON.stringify(user));
    localStorage.setItem("isAuth", JSON.stringify(true));

    cy.reload();

    // Click the Edit button
    cy.contains("button", "Edit").click();

    // // Modify the user information
    cy.get("#g_gender_input input").clear().type("123");

    cy.get("#g_gender_input .invalid-feedback").should(
      "contain",
      "A valid gender is required!"
    );
  });

  it("displays validation error for invalid password", () => {
    localStorage.setItem("activeUser", JSON.stringify(user));
    localStorage.setItem("isAuth", JSON.stringify(true));

    cy.reload();

    // Click the Edit button
    cy.contains("button", "Edit").click();

    // // Modify the user information
    cy.get("#g_password_input input").clear().type("123");

    cy.get("#g_password_input .invalid-feedback").should(
      "contain",
      "A valid password is required!"
    );
  });

  it("displays progress bars with correct widths", () => {
    cy.get(".progress-bar-success").should("have.length", 3); // Assuming there are 3 progress bars

    const progressValues = [38, 2, 48]; // Adjust these values according to your expectations

    cy.get(".progress-bar-success").each(($bar, index) => {
      const expectedWidth = `${progressValues[index]}%`;
      cy.wrap($bar)
        .invoke("width")
        .then((width) => {
          const roundedWidth = Math.round(width);
          expect(roundedWidth).to.equal(parseInt(expectedWidth));
        });
    });
  });
});
