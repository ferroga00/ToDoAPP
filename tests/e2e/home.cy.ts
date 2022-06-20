describe('Home', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
        cy.get('#email').click().type('admin@todoapp.com');
        cy.get('#passw').click().type('admin1234');
        cy.get('.login-main_sign-in-btn').click();
        cy.url().should('contain', '/home');
    });
    it('Should be able to move between tabs', () => {
        cy.url().should('contain', '/home');
        cy.get(':nth-child(2) > .pointer').click();
        cy.url().should('contain', '/tasks');
        // cy.wait(800);
        cy.get(':nth-child(3) > .pointer').click();
        cy.url().should('contain', '/project');
        // cy.wait(800);
        cy.get(':nth-child(4) > .pointer').click()
        cy.url().should('contain', '/about');
        // cy.wait(800);
        cy.get(':nth-child(5) > .pointer').click();
        cy.url().should('contain', '/admin');
    });

    it('Should be able to add a task and remove it', () => {
        cy.url().should('contain', '/home');
        cy.get(':nth-child(2) > .pointer').click();
        cy.url().should('contain', '/tasks');
        cy.get('.buttons_addTask').click();
        cy.get('#title').click().type('Test Task');
        cy.get('#description').click().type('Test Task Description');
        cy.get('.p-button > .pi').click();
        cy.get(':nth-child(5) > :nth-child(3) > span').click();
        cy.get('#priority').select("High");
        cy.get('.btn').click();
        cy.wait(1000);
        cy.get(':nth-child(3) > .pi').click();
        cy.get('.p-confirm-dialog-accept > .p-button-label').click();
        cy.get('.buttons_addTask').click();
        cy.get('#title').click().type('Test Task');
        cy.get('#description').click().type('Test Task Description');
        cy.get('.p-button > .pi').click();
        cy.get(':nth-child(5) > :nth-child(3) > span').click();
        cy.get('#priority').select("High");
        cy.get('.btn').click();
    });
    it('Should be able to add a project', () => {
        cy.url().should('contain', '/home');
        cy.get(':nth-child(3) > .pointer').click();
        cy.url().should('contain', '/project');
        cy.get('.addNewProject > p').click();
        cy.get('#title').click().type('Test Project');
        cy.get('#description').click().type('Test Project Description');
        cy.get('.btn').click();
        cy.wait(2000);
    });
    it('Should be able to add a task to a project and remove it', () => {
        cy.url().should('contain', '/home');
        cy.get(':nth-child(3) > .pointer').click();
        cy.url().should('contain', '/project');
        cy.get(':nth-child(1) > .project_title > p').click();
        cy.get(':nth-child(1) > .column-title_area > .column-options > .fa-solid').click();
        cy.get('.p-checkbox-box').click();
        cy.get('.p-dialog-content > button').click();
        cy.get('.p-dialog-content > button').click();
        cy.get('.drag-el > .fa-solid').click();
        cy.wait(2000);
    });
    it('Should be able to remove a project', () => {
        cy.url().should('contain', '/home');
        cy.get(':nth-child(3) > .pointer').click();
        cy.url().should('contain', '/project');
        cy.get(':nth-child(1) > .project_title > .p-panel-header-icon > .fa-solid').click();
        cy.get('.p-confirm-dialog-accept > .p-button-label').click();
        cy.wait(2000);
    });
    it('Should be able to complete a task from another user', () => {
        cy.get(':nth-child(5) > .pointer').click();
        cy.url().should('contain', '/admin');
        cy.get(':nth-child(1) > .p-panel > .p-panel-header > .p-checkbox > .p-checkbox-box').click();
    })
});