describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset"); // reseting the database

    const user = {
      name: "santiago",
      username: "santibp",
      password: "docpuber",
    };

    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("form").should("be.visible");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("santibp");
      cy.get("#password").type("docpuber");
      cy.contains("LOG IN").click();

      cy.contains("santiago logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("santibp");
      cy.get("#password").type("error");
      cy.contains("LOG IN").click();

      cy.contains("invalid username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      // log in user here
      const user = {
        username: "santibp",
        password: "docpuber",
      };
      cy.login(user);
    });

    it("A blog can be created", function () {
      cy.contains("POST A NEW BLOG").click();
      cy.get("#title").type("new title from cypress");
      cy.get("#author").type("new authorr from cypress");
      cy.get("#url").type("http://newUrl.com");
      cy.contains("POST BLOG").click();

      cy.contains("new title from cypress, new authorr from cypress");
    });

    describe("A blog can", function () {
      beforeEach(function () {
        // create blog
        cy.createBlog({
          title: "other title",
          author: "benitez",
          url: "http://foo.com",
        });
      });

      it("be liked", function () {
        cy.contains("other title, benitez").contains("View").click();

        cy.contains("Likes: 0").contains("Like").click();

        cy.contains("Likes: 2");
      });
    });

    describe("user can", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "other title",
          author: "benitez",
          url: "http://foo.com",
        });
      });

      it("delete a blog", function () {
        cy.contains("other title, benitez").contains("Delete").click();

        cy.contains("blog deleted successfully");
      });
    });


  });
});
