import { ObjectDefinition } from "@meta-system/object-definition";
import { Diff, diff } from "deep-diff";
import { SchemaType } from "../type/schema-types";

export const checkSchemaDiff =
(currentSchemas : Array<SchemaType>, newVersion : Array<SchemaType>) : Record<string, CompleteSchemaDiff> => {
  const diffs : Record<string, CompleteSchemaDiff> = {};
  currentSchemas.forEach(schema => {
    const schemaId = schema.identifier;
    const newSchemaVersion = newVersion.find(currentSchema => currentSchema.identifier === schemaId);
    diffs[schema.identifier] = processDiff(schemaId, diff(schema, newSchemaVersion));
  });

  return diffs;
};

interface SchemaChange {
  action : "changed" | "added" | "removed" | "UNKNOWN_CHANGE";
  path : string;
  newState : ObjectDefinition[""] | string | null;
}

interface CompleteSchemaDiff {
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

    const diffPath = rawDiff.path?.join(".");
    const diffPathIsTypeDiff =
      (rawDiff.rhs as unknown as ObjectDefinition[""]).type === undefined
      && diffPath.endsWith(".type");

    const path = diffPathIsTypeDiff
      ? diffPath.slice(0, diffPath.lastIndexOf(".type"))
      : diffPath;

    const newState = diffPathIsTypeDiff
      ? { "type": rawDiff.rhs as unknown as string }
      : rawDiff.rhs as unknown as ObjectDefinition[""];

    result.changes.push({
      action: kind,
      path,
      newState,
    });
  }

  return result;
};
