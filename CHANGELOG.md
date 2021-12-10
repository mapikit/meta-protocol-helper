# Releases
## 0.2.6 - Update DB protocols Inteface
Grouped optional arguments together in a "parameters" object
## 0.2.5 - Fix Query per property tool
The tool was failing to get multi-rule queries, which is now working normally.
## 0.2.4 - Export support Query Types
Exports some supporting types to aid development of a query builder in DB Protocols.
## 0.2.3 - Schema Diff bugfix
Fixed a bug when the diff check would fail if there was no difference between schemas.
## 0.2.2 - Change interface for the db methods of db Protocols
Now all the methods also receive the id of the schema they're making the request to.

## 0.2.1 - Small export fixes
Added some exports on the index file.

## 0.2 - DB Protocols
Introducing a helper for making DB protocols.
- New class exported: "DBProtocol"
- New command for checking DB protocols: `db-protocol-check`

Also, a lot of repo improvements were made, including:
- added linting
- added tests
- refactored
- now scoped to @meta-system
- now using object-definition package
- now using new meta-function-helper package

## 0.1.3 - Localized import
You now have the option to specify where the location of the file search will be when using this helper programatically.

## 0.1.2 - Make Logs More expressive
This is a small change in order to have more knowledge about where the search ofr the class and the file entrypoint is being done.

## 0.1.0 - Initial Release
Contains the base functionality for supporting the development of custom protocols for building systems using Meta System.