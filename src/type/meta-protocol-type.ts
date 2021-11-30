import { FunctionDefinition } from "@meta-system/meta-function-helper";

export interface MetaProtocolDefinition {
  protocolName : string;
  description : string;
  author ?: string;
  version : string; // Must be SemVer
  entrypoint : string;
  className : string;
  functionDefinitions ?: Array<string | FunctionDefinition>;
}

export interface BuiltMetaProtocolDefinition {
  protocolName : string;
  description : string;
  author ?: string;
  version : string; // Must be SemVer
  entrypoint : string;
  className : string;
  functionDefinitions ?: FunctionDefinition[];
}
