import { ObjectDefinition } from "./object-definition/object-definition-type";

export interface MetaFunction {
  functionName : string;
  description : string;
  author ?: string;
  version : string; // Must be SemVer
  inputParameters ?: ObjectDefinition;
  outputData ?: ObjectDefinition;
  entrypoint : string;
  mainFunction : string;
  customTypes ?: CustomType[];
}

export interface CustomType {
  name : string;
  type : ObjectDefinition;
}
