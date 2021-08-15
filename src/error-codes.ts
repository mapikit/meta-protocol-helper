/**
 * Error codes for validation failures
 */
export enum ValidationErrorCodes {
  V00P = "V00P - Could not read file",
  V01P = "V01P - ProtocolName must be a string",
  V02P = "V02P - Description must be a string",
  V03P = "V03P - Version must be a valid SemVer",
  V04P = "V04P - Entrypoint must be a string",
  V05P = "V05P - ClassName must be a string",
  V06P = "V06P - Could not find exported class in the given entrypoint",
  V07P = "V07P - The provided protocol does not correctly implements the MetaProtocol Class",
  V08P = "V08P - The protocol does not have all methods declared in the its configuration",
  V09P = "V09P - You must define an array of functions definitions when declaring a package",
  V10P = "V10P - GetPublicMethods function must return an object"
}
