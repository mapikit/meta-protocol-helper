/**
 * Error codes for validation failures
 */
export enum ValidationErrorCodes {
  V00 = "V00 - Could not read file",
  V01 = "V01 - Mentioned Author must be a non empty String",
  V02 = "V02 - Package Version is not a valid SemVer",
  V03 = "V03 - No Description for the function has been provided",
  V04 = "V04 - No entrypoint for the function was given",
  V05 = "V05 - No Main Function has been provided",
  V06 = "V06 - CustomTypes must be an Array",
  V07 = "V07 - Output Data must be an Array", // Deprecated
  V08 = "V08 - Output Branches must be a populated Array", // Deprecated
  V09 = "V09 - Input Parameters must be an Array",  // Deprecated
  V10 = "V10 - Custom object name must be a string",
  V11 = "V11 - Custom object property list must be an Array", // Deprecated
  V12 = "V12 - Custom object property name must be a string", // Deprecated
  V13 = "V13 - Custom object property type must be a non empty string", // Deprecated
  V14 = "V14 - Output Data name must be a non empty string",
  V15 = "V15 - Output Data type must be a non empty string",
  V16 = "V16 - Output Data branch must be a non empty string if present",
  V17 = "V17 - Output Branch branchName must be a non empty string",
  V18 = "V18 - Output Branch description must be a non empty string if provided",
  V19 = "V19 - Input parameter name must be a non empty string", // Deprecated
  V20 = "V20 - Input parameter type must be a non empty string", // Deprecated
  V21 = "V21 - Input parameter Description must be non empty string if provided", // Deprecated
  V22 = "V22 - Input parameter group must be non empty string if provided", // Deprecated
  V23 = "V23 - Input parameter required must be a boolean if provided - if omitted it is assumed as false",
  V24 = "V24 - Given type does not exist, or was not provided",
  V25 = "V25 - Configuration includes a custom type reference loop",
  V26 = "V26 - Given value is not a know Type",
  V27 = "V27 - Duplicated entity name detected - All entities must have unique names",
  V28 = "V28 - All branches must have a corresponding data bound to them", // Deprecated
  V29 = "V29 - Input validated is not an object",
  V30 = "V30 - Value of object should be a TypeDefinition",
  V31 = "V31 - Property \"type\" must be a string",
  V32 = "V32 - Property \"required\" must be a boolean",
  V33 = "V33 - Property \"subtype\" must be defined for deep types (array or object)"
}