package all.db.compare.rdbms.metadata;

public interface MetadataQueryProvider {

    String getColumnsQuery(String tableName);

    String getIndexesQuery(String tableName);

    String getForeignKeysQuery(String tableName);

    String getReferencingForeignKeysQuery(String tableName);

    String getTriggersQuery(String tableName);

    String getTriggerFunctionsQuery(String tableName);

    String getConstraintsQuery(String tableName);
}