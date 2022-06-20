describe('Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
    });

    it('Should be able to logout', () => {
        cy.get('#email').click().type('admin@todoapp.com');
        cy.get('#passw').click().type('admin1234');
        cy.get('.login-main_sign-in-btn').click();
        cy.url().should('contain', '/home');
        cy.get('.navbar_user-logout').click();
        cy.url().should('not.contain', '/home');
    });

    it('Should be able to signup', () => {
        cy.get('.login-main_sign-up').click();
        cy.get('#username').click().type('Test');
        cy.get('#email').click().type('test@test.org');
        cy.get('#passw').click().type('test1234');
        cy.get('#fullName').click().type('Johnny Test');
        cy.get('#role').select("User");
        cy.get('.signup-main_form-custom-btn').click();
        cy.get('.navbar_user-logout').click();
        cy.url().should('not.contain', '/home');
    });

    it('Should be unable to login with incorrect credentials', () => {
        cy.get('#email').click().type('admin@admin.com');
        cy.get('#passw').click().type('admin1234');
        cy.get('.login-main_sign-in-btn').click();
        cy.get('.error').should('contain', 'Incorrect login credentials');
        cy.url().should('not.contain', '/home');
    });
});