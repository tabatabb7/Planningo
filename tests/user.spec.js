/* global describe beforeEach it */

const { expect } = require("chai");
const db = require("../server/db");
const User = db.model("user");

xdescribe("User Model", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe("instanceMethods", () => {
    describe("correctPassword", () => {
      let cody;

      beforeEach(async () => {
        cody = await User.create({
          email: "cody@puppybook.com",
          password: "bones",
        });
      });

      it("returns true if the password is correct", () => {
        expect(cody.correctPassword("bones")).to.be.equal(true);
      });

      it("returns false if the password is incorrect", () => {
        expect(cody.correctPassword("bonez")).to.be.equal(false);
      });
    }); // end describe('correctPassword')
  });
  // end describe('User model')

  describe("first_name", () => {
    it("cannot be an empty string", async () => {
      await expect(User.create({ first_name: "" })).to.be.rejected;
    });
    it("cannot be null", async () => {
      await expect(User.create({})).to.be.rejected;
    });
  });

  describe("last_name", () => {
    it("cannot be an empty string", async () => {
      await expect(User.create({ last_name: "" })).to.be.rejected;
    });
    it("cannot be null", async () => {
      await expect(User.create({})).to.be.rejected;
    });
  });

  describe("email", () => {
    it("cannot be an empty string", async () => {
      await expect(User.create({ email: "" })).to.be.rejected;
    });
    it("cannot be null", async () => {
      await expect(User.create({})).to.be.rejected;
    });
  });

  describe("address_line1", () => {
    it("cannot be an empty string", async () => {
      await expect(User.create({ first_name: "" })).to.be.rejected;
    });
    it("cannot be null", async () => {
      await expect(User.create({})).to.be.rejected;
    });
  });

  describe("city", () => {
    it("city cannot be an empty string", async () => {
      await expect(User.create({ city: "" })).to.be.rejected;
    });
    it("city cannot be null", async () => {
      await expect(User.create({})).to.be.rejected;
    });
  });

  describe("zip", () => {
    it("zip cannot be an empty string", async () => {
      User.create({ zip: "" });
      await expect().to.be.rejected;
    });
    it("zip cannot be null", async () => {
      await expect(User.create({})).to.be.rejected;
    });
  });

  describe("state_or_province", () => {
    it("cannot be an empty string", async () => {
      User.create({ state_or_province: "" });
      await expect().to.be.rejected;
    });
    it("cannot be null", async () => {
      await expect(User.create({})).to.be.rejected;
    });
  });

  describe("country", () => {
    it("country cannot be an empty string", async () => {
      User.create({ country: "" });
      await expect().to.be.rejected;
    });
    it("country cannot be null", async () => {
      await expect(User.create({})).to.be.rejected;
    });
  });

  it("phone is a number", async () => {
    await expect(User.create({ phone: "917-xxx-xxxx" })).to.be.rejected;
  });

  it("email is a valid email", async () => {
    await expect(User.create({ email: "google.com" })).to.be.rejected;
  });
}); // end describe('instanceMethods')
