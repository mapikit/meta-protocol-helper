import { ObjectDefinition } from "@meta-system/object-definition";
import { Diff, diff } from "deep-diff";
import { SchemaType } from "../type/schema-types";

export const checkSchemaDiff =
(currentSchemas : Array<SchemaType>, newVersion : Array<SchemaType>) : Record<string, CompleteSchemaDiff> => {
  const diffs : Record<string, CompleteSchemaDiff> = {};
  const newSchemas = newVersion.filter((schemaTypes) => {
    return currentSchemas.find((schema) => schemaTypes.identifier === schema.identifier) === undefined;
  });

  currentSchemas.forEach(schema => {
    const schemaId = schema.identifier;
    const newSchemaVersion = newVersion.find(currentSchema => currentSchema.identifier === schemaId);
    diffs[schema.identifier] = processDiff(schemaId, diff(schema, newSchemaVersion));
  });

  newSchemas.forEach((schema) => {
    diffs[schema.identifier] = processDiff(schema.identifier, diff(undefined, schema));
  });

  return diffs;
};

interface SchemaChange {
  action : "changed" | "added" | "removed" | "type_changed" | "UNKNOWN_CHANGE";
  path : string;
  newState : ObjectDefinition[""] | string | null;
}

export interface CompleteSchemaDiff {
  identifier : string,
  changes : SchemaChange[]
}

// eslint-disable-next-line max-lines-per-function
const processDiff = (identifier : string, rawSchemaDiff : Diff<SchemaType>[]) : CompleteSchemaDiff => {
  const result : CompleteSchemaDiff = {
    identifier,
    changes: [],
  };

  for (const rawDiff of rawSchemaDiff) {
    const kindMap : Record<typeof rawDiff["kind"], SchemaChange["action"]> = {
      "N": "added",
      "D": "removed",
      "E": "changed",
      "A": "UNKNOWN_CHANGE",
    };

    const kind = kindMap[rawDiff.kind];

    if (rawDiff.kind === "A") {
      result.changes.push(
        {
          action: kind,
          path : "",
          newState: null,
        },
      );

      continue;
    }

    if (rawDiff.kind === "D") {
      result.changes.push(
        {
          action: kind,
          path : rawDiff.path?.join(".") ?? "FULL_SCHEMA",
          newState: null,
        },
      );

      continue;
    }

    const diffPath : string | undefined = rawDiff.path?.join(".");
    const diffPathIsTypeDiff =
      (rawDiff.rhs as unknown as ObjectDefinition[""]).type === undefined
      && diffPath?.endsWith(".type");

    const path = diffPath;
    const newState = rawDiff.rhs as unknown as ObjectDefinition[""];
    const action = diffPathIsTypeDiff ? "type_changed" : kind;

    result.changes.push({
      action,
      path: path ?? "FULL_SCHEMA",
      newState,
    });
  }

  return result;
};
