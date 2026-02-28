describe("Booking - datumval (rätt/fel) och respons", () => {
  beforeEach(() => {
    cy.visit("/OurChallenges.html");
    cy.get("button.bookBtn", { timeout: 15000 }).first().click();
    cy.get("#date", { timeout: 15000 }).should("be.visible");
  });

  it("Giltigt datum: går vidare till modal2 och visar tidval (respons)", () => {
    cy.get("#date").clear().type("2026-03-01");
    cy.contains("button", /search available times/i).click();
    cy.get("#modal2").should("be.visible");
    cy.get("#time").should("be.visible");
    cy.get("#time option").should("have.length.greaterThan", 0);
  });

  it("Fel (tomt datum): stannar kvar på modal1 och visar inte modal2", () => {
    cy.get("#date").clear();
    cy.contains("button", /search available times/i).click();
    cy.get("#modal1").should("be.visible");
    cy.get("#modal2").should("not.be.visible");
  });
});