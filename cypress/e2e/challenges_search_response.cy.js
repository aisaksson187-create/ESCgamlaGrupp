describe("Challenges - sökfilter respons", () => {
  beforeEach(() => {
    cy.visit("/OurChallenges.html");
    cy.get(".filter-interface", { timeout: 10000 }).should("exist");
    cy.get(".search-input", { timeout: 10000 }).should("exist");
  });

  it("ger respons när man söker på något rimligt", () => {
    cy.get(".search-input").clear({ force: true }).type("hack", { force: true });
    cy.get("#allChallenges").should("exist");
  });

  it("visar 'No challenges found' när sökning inte matchar", () => {
    cy.get(".search-input")
      .clear({ force: true })
      .type("zzzzzz-not-a-real-challenge", { force: true });

    cy.contains(/no challenges found/i, { timeout: 10000 }).should("be.visible");
  });
});