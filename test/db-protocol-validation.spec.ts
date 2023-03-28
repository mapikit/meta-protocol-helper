import { expect } from "chai";
import { validateProtocol } from "../src/bin/validate-protocol.js";
import { asyncTestThrow } from "./helpers/test-throw.js";

describe("Validation of DB protocols", () => {
  it("Validates a well-defined class successfully", async () => {
    const result = await  asyncTestThrow(async () => {
      await validateProtocol("./test/test-data/db-protocols/correct", true);
    });

    expect(result.thrown).to.be.false;
  });
});
