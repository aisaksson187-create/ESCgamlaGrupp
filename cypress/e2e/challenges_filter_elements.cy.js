describe("Challenges - filter UI", () => {
  it("har filterelement (knapp + filterkontroller)", () => {
    cy.visit("/OurChallenges.html");
    cy.get(".filterBtn").should("exist").and("be.visible");
    cy.get(".filter-interface").should("exist");
    cy.get(".filter-interface").should("have.css", "display", "none");
    cy.get(".checkbox-online").should("exist");
    cy.get(".checkbox-onsite").should("exist");
    cy.get(".search-input").should("exist");
    cy.get(".filterTags[data-tag='javascript']").should("exist");
    cy.get("#closeFilter").should("exist");
  });
});