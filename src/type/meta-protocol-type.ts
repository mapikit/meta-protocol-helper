import { FunctionDefinition } from "@meta-system/meta-function-helper";
import { ObjectDefinition } from "@meta-system/object-definition";

export interface MetaProtocolDefinition {
  protocolName : string;
  description : string;
  author ?: string;
  version ?: string; // If present, must be SemVer and match package.json
  entrypoint : string;
  className : string;
  functionDefinitions ?: Array<string | FunctionDefinition>;
  configurationFormat : ObjectDefinition;
}

export interface BuiltMetaProtocolDefinition {
  protocolName : string;
  description : string;
  author ?: string;
  version ?: string; // If present, must be SemVer and match package.json
  entrypoint : string;
  className : string;
  functionDefinitions ?: FunctionDefinition[];
  configurationFormat : ObjectDefinition;
}
