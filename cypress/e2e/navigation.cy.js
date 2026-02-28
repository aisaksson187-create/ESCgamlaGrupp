describe("Navigation", () => {
  it("kan gå från startsidan till The Story", () => {
    cy.visit("/index.html");
    cy.contains("a", /the story/i).click();
    cy.location("pathname").should("match", /theStory\.html$/i);
  });

  it("kan navigera till OurChallenges", () => {
    cy.visit("/index.html");
    cy.get('a[href="OurChallenges.html"]').first().click();
    cy.location("pathname").should("match", /OurChallenges\.html$/i);
  });
});