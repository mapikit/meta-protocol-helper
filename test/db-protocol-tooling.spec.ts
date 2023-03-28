import { expect } from "chai";
import { getQueryPerProperty } from "../src/db-protocols-tools/get-query-per-property.js";
import { checkSchemaDiff } from "../src/db-protocols-tools/get-schema-diff.js";
import { SchemaType } from "../src/type/schema-types.js";

describe("DbProtocols Tooling", () => {
  describe("Get Query Paths", () => {
    it("Gets query from shallow object", () => {
      const query = {
        "name": { "equal_to": "John" },
        "age": { "greater_than": 22 },
      };

      const result = getQueryPerProperty(query);
      // Doesn't change for shallow properties
      expect(result).to.be.deep.equal(query);
    });

    it("Extract deep properties", () => {
      const query = {
        "name": { "equal_to": "John" },
        "age": { "greater_than": 22 },
        "hobbies": { "iceHobbies": { "contains_one_of": ["skiing", "piano"] } },
      };

      const result = getQueryPerProperty(query);
      const expectation = { ...query };
      delete expectation.hobbies;

      expectation["hobbies.iceHobbies"] = query.hobbies.iceHobbies;

      expect(result).to.be.deep.equal(expectation);
    });

    it("Extracts multi-rule paths successfully", () => {
      const query = {
        dollarBillsInVirtualWallet: {
          contains_greater_or_equal_to: 20,
          not_contains: 100,
        },
      };

      const result = getQueryPerProperty(query);
      const expectation = { ...query };

      expect(result).to.be.deep.equal(expectation);
    });
  });

  describe("Check Schema Diff", () => {
    it("Checks New Added Schema Diff", () => {
      const newSchema : SchemaType = {
        name: "testSchema",
        format: {
          property1: { "type": "string" },
          property2: { "type": "number" },
          property3: { "type": "boolean" },
        },
        dbProtocol: "",
        identifier: "1234",
      };

      const result = checkSchemaDiff([], [newSchema]);

      expect(result["1234"].changes[0].action).to.be.equal("added");
      expect(result["1234"].changes[0].newState).to.be.deep.equal(newSchema);
      expect(result["1234"].changes[0].path).to.be.equal("FULL_SCHEMA");
    });

    it("Checks Removed Schema Diff", () => {
      const removedSchema : SchemaType = {
        name: "testSchema",
        format: {
          property1: { "type": "string" },
          property2: { "type": "number" },
          property3: { "type": "boolean" },
        },
        dbProtocol: "",
        identifier: "1234",
      };

      const result = checkSchemaDiff([removedSchema], []);

      expect(result["1234"].changes[0].action).to.be.equal("removed");
      expect(result["1234"].changes[0].newState).to.be.equal(null);
      expect(result["1234"].changes[0].path).to.be.equal("FULL_SCHEMA");
    });

    it("Checks added Schema property Diff", () => {
      const originalSchema : SchemaType = {
        name: "testSchema",
        format: {
          property1: { "type": "string" },
          property2: { "type": "number" },
          property3: { "type": "boolean" },
        },
        dbProtocol: "",
        identifier: "1234",
      };

      const changedSchema : SchemaType = {
        name: "testSchema",
        format: {
          property1: { "type": "string" },
          property2: { "type": "number" },
          property3: { "type": "boolean" },
          property4: { "type": "number" },
        },
        dbProtocol: "",
        identifier: "1234",
      };

      const result = checkSchemaDiff([originalSchema], [changedSchema]);

      expect(result["1234"].changes[0].action).to.be.equal("added");
      expect(result["1234"].changes[0].newState).to.be.deep.equal({ type: "number" });
      expect(result["1234"].changes[0].path).to.be.equal("format.property4");
    });

    it("Checks removed Schema property Diff", () => {
      const changedSchema : SchemaType = {
        name: "testSchema",
        format: {
          property1: { "type": "string" },
          property2: { "type": "number" },
          property3: { "type": "boolean" },
        },
        dbProtocol: "",
        identifier: "1234",
      };

      const originalSchema : SchemaType = {
        name: "testSchema",
        format: {
          property1: { "type": "string" },
          property2: { "type": "number" },
          property3: { "type": "boolean" },
          property4: { "type": "number" },
        },
        dbProtocol: "",
        identifier: "1234",
      };

      const result = checkSchemaDiff([originalSchema], [changedSchema]);

      expect(result["1234"].changes[0].action).to.be.equal("removed");
      expect(result["1234"].changes[0].newState).to.be.deep.equal(null);
      expect(result["1234"].changes[0].path).to.be.equal("format.property4");
    });

    it("Checks changed type of Schema property Diff", () => {
      const originalSchema : SchemaType = {
        name: "testSchema",
        format: {
          property1: { "type": "string" },
          property2: { "type": "number" },
          property3: { "type": "boolean" },
        },
        dbProtocol: "",
        identifier: "1234",
      };

      const changedSchema : SchemaType = {
        name: "testSchema",
        format: {
          property1: { "type": "string" },
          property2: { "type": "number" },
          property3: { "type": "object", subtype: {
            anotherProp: { "type": "string" },
          } },
        },
        dbProtocol: "",
        identifier: "1234",
      };

      const result = checkSchemaDiff([originalSchema], [changedSchema]);

      expect(result["1234"].changes[0].action).to.be.equal("type_changed");
      expect(result["1234"].changes[0].newState).to.be.deep.equal("object");
      expect(result["1234"].changes[0].path).to.be.equal("format.property3.type");
      expect(result["1234"].changes[1].action).to.be.equal("added");
      expect(result["1234"].changes[1].newState).to.be.deep.equal({ anotherProp: { type: "string" } });
      expect(result["1234"].changes[1].path).to.be.equal("format.property3.subtype");
    });

    it ("There's no difference between schemas", () => {
      const originalSchema : SchemaType = {
        name: "testSchema",
        format: {
          property1: { "type": "string" },
          property2: { "type": "number" },
          property3: { "type": "boolean" },
        },
        dbProtocol: "",
        identifier: "1234",
      };

      const result = checkSchemaDiff([originalSchema], [originalSchema]);

      expect(result["1234"].changes.length).to.be.equal(0);
    });
  });
});
