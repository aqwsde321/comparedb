package all.db.compare.rdbms.metadata.impl;

import all.db.compare.rdbms.metadata.MetadataQueryProvider;
import org.springframework.stereotype.Component;


@Component("mariadbMetadataQueryProvider")
public class MariaDBMetadataQueryProvider implements MetadataQueryProvider {

    @Override
    public String getColumnsQuery(String tableName) {
        return "SHOW COLUMNS FROM " + tableName + ";";
    }

    @Override
    public String getIndexesQuery(String tableName) {
        return "SHOW INDEX FROM " + tableName + ";";
    }

    @Override
    public String getForeignKeysQuery(String tableName) {
        return "SELECT CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_NAME = '" + tableName + "';";
    }

    @Override
    public String getReferencingForeignKeysQuery(String tableName) {
        return "SELECT CONSTRAINT_NAME, TABLE_NAME, COLUMN_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE REFERENCED_TABLE_NAME = '" + tableName + "';";
    }

    @Override
    public String getTriggersQuery(String tableName) {
        return "SHOW TRIGGERS LIKE '" + tableName + "';";
    }

    @Override
    public String getTriggerFunctionsQuery(String tableName) {
        // MariaDB에서는 트리거 함수에 대한 정보가 제한적일 수 있으므로 적절한 쿼리 작성
        return "SELECT TRIGGER_NAME, EVENT_MANIPULATION FROM information_schema.TRIGGERS WHERE EVENT_OBJECT_TABLE = '" + tableName + "';";
    }

    @Override
    public String getConstraintsQuery(String tableName) {
        return "SELECT CONSTRAINT_NAME, CONSTRAINT_TYPE FROM information_schema.TABLE_CONSTRAINTS WHERE TABLE_NAME = '" + tableName + "';";
    }
}