import { checkSchemaDiff } from "./db-protocols-tools/get-schema-diff";
import { SchemaType } from "./type/schema-types";
import { getQueryPerProperty } from "./db-protocols-tools/get-query-per-property";
import { QueryType } from "./type/db-protocol-types";

export type SchemaList = Array<SchemaType>

export interface BaseDBProtocolResponse {
  success : boolean;
}

export interface QueryOperationResponse extends BaseDBProtocolResponse {
  affectedEntities : number;
}

export interface FindByIdResponse extends BaseDBProtocolResponse {
  data : unknown;
}


export interface FindResponse extends BaseDBProtocolResponse {
  data : unknown[];
  pages ?: number;
}

export interface CountResponse extends BaseDBProtocolResponse {
  count : number;
}

export abstract class DBProtocol<ProtocolConfig> {
  public constructor (
    protected protocolConfiguration : ProtocolConfig,
    protected schemaList : SchemaList,
  ) {
    this.protocolConfiguration = Object.freeze(protocolConfiguration);
  }

  // Tool Methods
  protected getQueryPerProperty = getQueryPerProperty;
  protected checkSchemaDiff = checkSchemaDiff;

  /**
   * This method is used to check if the protocol supports the way the schema is structured.
   * For instance, you may want to not support deep schemas in a SQL DB.
   *
   * If there is a schema you don't want to support, check for their presence and
   * throw with a meaningful error that should point the user to fix their schemas.
   */
  public abstract verifySchemaSupport () : void;

  // Utils methods
  public abstract validateConfiguration () : void;

  /**
   * Method called to start the connection to the database.
   * If required, it should build the connections pool.
   */
  public abstract initialize () : Promise<void>;

  /**
   * Method called to stop the conection to the database.
   * If required, it should destroy all connections.
   */
  public abstract shutdown () : Promise<void>;
  public abstract getProtocolPublicMethods () : Record<string, Function>;

  // Actual DB methods
  public abstract insert (schemaId : string, data : unknown) : Promise<BaseDBProtocolResponse>;
  public abstract deleteById (schemaId : string, id : string) : Promise<BaseDBProtocolResponse>;
  public abstract updateById (schemaId : string, data : unknown, id : string) : Promise<BaseDBProtocolResponse>;
  public abstract update (schemaId : string, data : unknown, query : QueryType) : Promise<QueryOperationResponse>;
  public abstract delete (schemaId : string, query : QueryType) : Promise<QueryOperationResponse>;
  public abstract findById (schemaId : string, id : string) : Promise<FindByIdResponse>;
  public abstract find (schemaId : string, query : QueryType, limit ?: number, offset ?: number)
  : Promise<FindResponse>;

  public abstract count (qschemaId : string, uery : QueryType) : Promise<CountResponse>;
}
