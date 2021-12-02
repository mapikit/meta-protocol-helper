import { expect } from "chai";
import { getQueryPerProperty } from "../src/db-protocols-tools/get-query-per-property";
import { checkSchemaDiff } from "../src/db-protocols-tools/get-schema-diff";
import { SchemaType } from "../src/type/schema-types";

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
  });
});
