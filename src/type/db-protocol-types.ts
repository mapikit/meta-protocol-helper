/** This is the type used for the base query of
 * objects, supporting query operations like $and, $or.
 */
export type QueryType = {
  // The key must be a property of the schema
  [K : string] : ComplexQuery;
}

/** This type is used for when a query operator was
 * already used in a parent node on the tree, and no children must
 * be another query operator.
 */
type InnerObjectQueryType = {
  [K : string] : PropertyQuery;
}

// $Or and $Either are the same
type EitherOperation = {
  "$either" : PropertyQuery[];
}

type OrOperation = {
  "$or" : PropertyQuery[];
}

type AndOperation = {
  "$and" : PropertyQuery[];
}

export type QueryOperation = EitherOperation | OrOperation | AndOperation
| TypeStringQuery | TypeNumberQuery
| TypeDateQuery | TypeBooleanQuery | TypeStringArrayQuery
| TypeNumberArrayQuery | TypeBooleanArrayQuery | TypeDateArrayQuery
| TypeObjectArrayQuery;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const testQuery : QueryType = {
  "name": { "equal_to": "John" },
  "age": { "$and": [{ "less_or_equal_to": 13, "greater_or_equal_to": 40 }] },
  "hobbies": { "$either": [{ "equal_to": "bowling" }, { "equal_to": "skating" }, { "contains": "ice" }] },
};

// "grandfather.family.name" must contain "shazam" AND is not "shazambalam"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const testQuery2 : QueryType = {
  "grandfather": { "family": { "surname": { "$and": [
    { "contains": ["shazam"] },
    { "not_one_of": ["shazambalam"] },
  ] } } },
};

type ComplexQuery = PropertyQuery | QueryOperation | QueryType;

type PropertyQuery = TypeStringQuery | TypeNumberQuery
| TypeDateQuery | TypeBooleanQuery | TypeStringArrayQuery | InnerObjectQueryType
| TypeNumberArrayQuery | TypeBooleanArrayQuery | TypeDateArrayQuery
| TypeObjectArrayQuery;

// enum QueryTypes {
//   string,
//   number,
//   date,
//   boolean,
//   stringArray,
//   numberArray,
//   booleanArray,
//   dateArray,
//   object,
//   objectArray,
// }

interface TypeStringQuery {
  equal_to ?: string;
  not_equal_to ?: string;
  one_of ?: string[];
  not_one_of ?: string[];
  exists ?: boolean;
  regexp ?: string;
}

interface TypeNumberQuery {
  equal_to ?: number;
  not_equal_to ?: number;
  greater_than ?: number;
  greater_or_equal_to ?: number;
  less_than ?: number;
  less_or_equal_to ?: number;
  one_of ?: number[];
  not_one_of ?: number[];
  exists ?: boolean;
}

interface TypeDateQuery {
  equal_to ?: Date;
  not_equal_to ?: Date;
  greater_than ?: Date;
  greater_or_equal_to ?: Date;
  less_than ?: Date;
  less_or_equal_to ?: Date;
  one_of ?: Date[];
  not_one_of ?: Date[];
  exists ?: boolean;
}

interface TypeBooleanQuery {
  equal_to ?: boolean;
  not_equal_to ?: boolean;
  exists ?: boolean;
}

// Base class - Don't put it in PropertyQuery
interface TypeArrayQuery<T> {
  identical_to ?: T[];
  contains_all ?: T[];
  contains ?: T;
  in ?: T; // The same as `contains`
  not_contains ?: T;
  not_in ?: T; // The same as `not_contains`
  contains_one_of ?: T[];
  contains_none_of ?: T[];
  size ?: number;
  exists ?: boolean;
}

interface TypeStringArrayQuery extends TypeArrayQuery<string> {
  contains_regexp ?: string;
}

interface TypeNumberArrayQuery extends TypeArrayQuery<number> {
  contains_greater_than ?: number;
  contains_greater_or_equal_to ?: number;
  contains_less_than ?: number;
  contains_less_or_equal_to ?: number;
}

type TypeBooleanArrayQuery = TypeArrayQuery<boolean>;

interface TypeDateArrayQuery extends TypeArrayQuery<Date> {
  contains_greater_than ?: Date;
  contains_greater_or_equal_to ?: Date;
  contains_less_than ?: Date;
  contains_less_or_equal_to ?: Date;
}

type TypeObjectArrayQuery = TypeArrayQuery<object>;
