import Path from "path";
import FS from "fs";
import { ValidationErrorCodes } from "./error-codes";

const fsPromise = FS.promises;

/**
 * Finds the `meta-function.json` file
 * 
 * This function either finds the file and yields its contents as a string
 * or throws with an error
 */
export const findMetaFunctionFile = async () : Promise<string> => {
  const defaultFileName = "meta-function.json";
  const filePath = Path.join(process.env.PWD, defaultFileName);

  const result = await fsPromise.readFile(filePath, "utf8")
    .catch((error) => {
      console.error(error);
      throw Error(ValidationErrorCodes.V00);
    });
  
  return result;
}