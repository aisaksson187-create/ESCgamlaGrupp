describe("Datum i bokning (kalender) - rätt/fel och respons", () => {
  beforeEach(() => {
    cy.visit("/OurChallenges.html");

    // Vänta på att kort/bokningsknapp laddas (API)
    cy.get("button.bookBtn", { timeout: 15000 }).first().click();

    // Datumfältet finns i modal1
    cy.get("#date", { timeout: 15000 }).should("exist");
  });

  it("giltigt datum: går vidare till tidval", () => {
    cy.get("#date").clear().type("2026-03-01");
    cy.contains("button", /search available times/i).click();

    // Respons: modal2 syns (eller åtminstone att tidväljaren finns)
    cy.get("#modal2").should("be.visible");
    cy.get("#time").should("exist");
  });

  it("tomt datum: stannar kvar och visar inte tidval", () => {
    cy.get("#date").clear();
    cy.contains("button", /search available times/i).click();

    // Respons: modal2 ska inte bli synlig
    cy.get("#modal2").should("not.be.visible");
    // modal1 kvar
    cy.get("#modal1").should("be.visible");
  });
});