describe("Navigation", () => {
  it("navigerar från index till The story", () => {
    cy.visit("/index.html");


    cy.contains("a", /the story/i).click();


    cy.location("pathname").should("match", /theStory\.html$/i);


    cy.get("body").should("be.visible");
  });
});