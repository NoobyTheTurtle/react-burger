const BASE_URL = "norma.nomoreparties.space"

describe("Make order", () => {
    Cypress.Cookies.defaults({
        preserve: 'accessToken'
    })

    before(() => {
        cy.setCookie("accessToken", "auth-token")
        cy.intercept({
            method: 'GET',
            url: '/api/ingredients',
            hostname: BASE_URL,
        }, { fixture: 'ingredients.json' })

        cy.intercept({
            method: 'GET',
            url: '/api/auth/user',
            hostname: BASE_URL,
        }, { fixture: 'user.json' })
    })

    it('should be available on localhost:3000', () => {
        cy.visit('http://localhost:3000')
    })

    it("should load all ingredients", () => {
        cy.get('a[class^=burger-ingredients-item]').should('have.length', 15)
    })

    it("should open modal with ingredient details and close it", () => {
        cy.get('a[class^=burger-ingredients-item]').first().click()
        cy.get("div[class^=modal_modal__]").as("modal")
        cy.get("@modal").find("h2").contains("Детали ингредиента")
        cy.get("@modal").find("h3").contains("Краторная булка N-200i")
        cy.get("@modal").find("img").should("have.attr", "src", "https://code.s3.yandex.net/react/code/bun-02-large.png")
        cy.get("@modal").find("button[class^=modal_button__]").click()
        cy.get('@modal').should('not.exist')
    })

    it("should add bun to constructor", () => {
        cy.get('p').contains('Краторная булка N-200i').parent().as("bun")
        cy.get('section[class^=burger-constructor_section__]').as("constructor")

        cy.get('@bun').trigger('dragstart')
        cy.get('@constructor').trigger('drop')
        cy.get('@bun').find("p[class^=counter_counter__num__]").should('contain', 1)
        cy.get('@constructor').find("li[class^=selected-ingredients]").should('have.length', 2)
    })

    it("should add sauce to constructor", () => {
        cy.get('p').contains('Соус Spicy-X').parent().as("sauce")
        cy.get('section[class^=burger-constructor_section__]').as("constructor")

        cy.get('@sauce').trigger('dragstart')
        cy.get('@constructor').trigger('drop')
        cy.get('@sauce').find("p[class^=counter_counter__num__]").should('contain', 1)
        cy.get('@constructor').find("li[class^=selected-ingredients]").should('have.length', 3)
    })

    it("should add main to constructor", () => {
        cy.get('p').contains('Филе Люминесцентного тетраодонтимформа').parent().as("main")
        cy.get('section[class^=burger-constructor_section__]').as("constructor")

        cy.get('@main').trigger('dragstart')
        cy.get('@constructor').trigger('drop')
        cy.get('@main').find("p[class^=counter_counter__num__]").should('contain', 1)
        cy.get('@constructor').find("li[class^=selected-ingredients]").should('have.length', 4)
    })

    it("should send order", () => {
        cy.intercept({
            method: 'POST',
            url: '/api/orders',
            hostname: BASE_URL,
        }, { fixture: 'order.json' }).as("orderRequest")

        cy.get('button').contains("Оформить заказ").click()
        cy.wait("@orderRequest").then((request) => {
            const requestIngredientsIds = request.request.body.ingredients
            const responseIngredientsIds = request.response.body.order.ingredients.map(el => el._id)
            if (!(requestIngredientsIds.length === responseIngredientsIds.length &&
                requestIngredientsIds.every((el) => responseIngredientsIds.includes(el))))
                throw new Error("Invalid ingredients ids")
        })
    })

    it("should close modal", () => {
        cy.get("div[class^=modal_modal__").as("modal")
        cy.get('section[class^=burger-constructor_section__]').as("constructor")

        cy.get("@modal").find("button[class^=modal_button__]").click()
        cy.get('@modal').should('not.exist')
        cy.get('@constructor').find("li[class^=selected-ingredients]").should('have.length', 0)
    })

})