import { validateProtocol } from "../src/bin/validate-protocol";
import { asyncTestThrow } from "./helpers/test-throw";
import { expect } from "chai";

describe("Full Protocol Validation", () => {
  // We will only test the properties and the class here
  // The functions are validated by the meta-function-helper package.

  describe("Description File validation", () => {
    it("Validates successfully a Well defined protocol and class", async () => {
      const result = await asyncTestThrow(async () => {
        await validateProtocol("./test/test-data");
      });

      expect(result.error).to.be.undefined;
      expect(result.thrown).to.be.false;
    });

    it("Fails validation for a protocol definition that lacks name", async () => {
      const result = await asyncTestThrow(async () => {
        await validateProtocol("./test/test-data/badly-defined-protocols/missing-name");
      });

      expect(result.error.message).to.contain("ProtocolName");
      expect(result.thrown).to.be.true;
    });

    it("Fails validation for a protocol definition that lacks version", async () => {
      const result = await asyncTestThrow(async () => {
        await validateProtocol("./test/test-data/badly-defined-protocols/missing-version");
      });

      expect(result.error.message).to.contain("Version");
      expect(result.thrown).to.be.true;
    });

    it("Fails validation for a protocol definition that lacks entrypoint", async () => {
      const result = await asyncTestThrow(async () => {
        await validateProtocol("./test/test-data/badly-defined-protocols/missing-entrypoint");
      });

      expect(result.error.message).to.contain("Entrypoint");
      expect(result.thrown).to.be.true;
    });

    it("Fails validation for a protocol definition that lacks className", async () => {
      const result = await asyncTestThrow(async () => {
        await validateProtocol("./test/test-data/badly-defined-protocols/missing-classname");
      });

      expect(result.error.message).to.contain("ClassName");
      expect(result.thrown).to.be.true;
    });
  });

  describe("Class Validation", () => {
    // The first test for the other describe already tests a valid class

    it("Fails for a class with missing \"start\" method", async () => {
      const result = await asyncTestThrow(async () => {
        await validateProtocol("./test/test-data/badly-defined-classes/missing-start-method/");
      });

      expect(result.error.message).to.contain("method \"start\"");
      expect(result.thrown).to.be.true;
    });

    it("Fails for a class with missing \"stop\" method", async () => {
      const result = await asyncTestThrow(async () => {
        await validateProtocol("./test/test-data/badly-defined-classes/missing-stop-method/");
      });

      expect(result.error.message).to.contain("method \"stop\"");
      expect(result.thrown).to.be.true;
    });

    it("Fails for a class with missing \"validateConfiguration\" method", async () => {
      const result = await asyncTestThrow(async () => {
        await validateProtocol("./test/test-data/badly-defined-classes/missing-validateconfiguration-method/");
      });

      expect(result.error.message).to.contain("method \"validateConfiguration\"");
      expect(result.thrown).to.be.true;
    });

    it("Fails for a class with missing \"getProtocolPublicMethods\" method", async () => {
      const result = await asyncTestThrow(async () => {
        await validateProtocol("./test/test-data/badly-defined-classes/missing-getpublicmethods-method/");
      });

      expect(result.error.message).to.contain("method \"getProtocolPublicMethods\"");
      expect(result.thrown).to.be.true;
    });

    it("Fails for a class with public methods defined but not declared", async () => {
      // The methods are defined in the meta-protocol.json file, but the class does not implement it
      const result = await asyncTestThrow(async () => {
        await validateProtocol("./test/test-data/badly-defined-classes/missing-declared-method/");
      });

      expect(result.error.message).to.contain("function \"aNamedFunction\" must be present");
      expect(result.thrown).to.be.true;
    });
  });
});
