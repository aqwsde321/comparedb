package all.db.compare.rdbms.metadata.impl;


import all.db.compare.rdbms.metadata.MetadataQueryProvider;
import org.springframework.stereotype.Component;

@Component("postgresMetadataQueryProvider")
public class PostgresMetadataQueryProvider implements MetadataQueryProvider {

    @Override
    public String getColumnsQuery(String tableName) {
        return "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '" + tableName + "';";
    }

    @Override
    public String getIndexesQuery(String tableName) {
        return "SELECT indexname, indexdef FROM pg_indexes WHERE tablename = '" + tableName + "';";
    }

    @Override
    public String getForeignKeysQuery(String tableName) {
        return "SELECT conname AS constraint_name, confkey AS foreign_key FROM pg_constraint WHERE conrelid = '" + tableName + "'::regclass AND contype = 'f';";
    }

    @Override
    public String getReferencingForeignKeysQuery(String tableName) {
        return "SELECT conname AS constraint_name, confkey AS referencing_key FROM pg_constraint WHERE confrelid = '" + tableName + "'::regclass AND contype = 'f';";
    }

    @Override
    public String getTriggersQuery(String tableName) {
        return "SELECT trigger_name FROM information_schema.triggers WHERE event_object_table = '" + tableName + "';";
    }

    @Override
    public String getTriggerFunctionsQuery(String tableName) {
        return "SELECT action_timing, event_manipulation, trigger_function_name FROM information_schema.triggers WHERE event_object_table = '" + tableName + "';";
    }

    @Override
    public String getConstraintsQuery(String tableName) {
        return "SELECT constraint_name, constraint_type FROM information_schema.table_constraints WHERE table_name = '" + tableName + "';";
    }
}