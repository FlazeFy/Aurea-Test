describe("uth API - GET Refresh Token", () => {
    const loremData = Cypress.env("lorem")
    const url = "/api/auth/refresh-token"
    let userToken 
    let adminToken

    before(() => {
        cy.useLogin("user").then((token: string) => {
            console.log(token)
            userToken = token
        })
        cy.useLogin("admin").then((token: string) => {
            adminToken = token
        })
    })

    describe("Success cases", () => {
        it("should refresh token successfully with valid payload for user", () => {
            cy.request({
                method: "GET", 
                url, 
                headers: {
                    Authorization: `Bearer ${userToken}`
                },
            }).then((res) => {
                cy.expectDefaultResponseProps(res, 200, 'Token refreshed successfully')
                cy.expectKeyExist(res.body.data, ["token", "name", "email", "role"])
            })
        })
        it("should refresh token successfully with valid payload for admin", () => {
            cy.request({
                method: "GET", 
                url, 
                headers: {
                    Authorization: `Bearer ${userToken}`
                },
            }).then((res) => {
                cy.expectDefaultResponseProps(res, 200, 'Token refreshed successfully')
                cy.expectKeyExist(res.body.data, ["token", "name", "email", "role"])
            })
        })
    })
  
    describe("Failed cases", () => {
        it("should fail if the jwt token is not valid", () => {
            cy.request({
                method: "GET",
                url,
                headers: {
                    Authorization: `Bearer ${loremData.short}`
                },
                failOnStatusCode: false
            }).then((res) => {
                cy.expectDefaultResponseProps(res, 401, 'Token is not valid')
            })
        })
        it("should fail if auth header is empty", () => {
            cy.request({
                method: "GET",
                url,
                failOnStatusCode: false
            }).then((res) => {
                cy.expectDefaultResponseProps(res, 401, 'Token not exist')
            })
        })
    })
})
  