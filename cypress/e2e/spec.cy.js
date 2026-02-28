describe("Health check", () => {
  it("webbsidan laddar på localhost", () => {
    cy.visit("/");
    cy.get("body").should("be.visible");
  });
});