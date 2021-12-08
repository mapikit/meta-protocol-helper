import { ObjectDefinition } from "@meta-system/object-definition";

/**
 * Duplicated interface from Meta-System
 */
export interface SchemaType {
  name : string;
  format : ObjectDefinition;
  dbProtocol : string;
  identifier : string;
}
