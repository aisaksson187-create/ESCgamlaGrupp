describe("Challenges - filter (element finns)", () => {
  it("har filterkontroller på Challenges-sidan", () => {
    cy.visit("/OurChallenges.html");
    cy.get(".filter-interface").should("exist");
    cy.get(".checkbox-online").should("exist");
    cy.get(".checkbox-onsite").should("exist");
    cy.get("#and").should("exist").and("be.checked");
    cy.get("#or").should("exist");
    cy.get(".search-input").should("exist");
    cy.get('.filterTags[data-tag="javascript"]').should("exist");
  });
});