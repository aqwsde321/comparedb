package all.db.compare.rdbms.metadata.impl;


import all.db.compare.rdbms.metadata.MetadataQueryProvider;
import org.springframework.stereotype.Component;

@Component("oracleMetadataQueryProvider")
public class OracleMetadataQueryProvider implements MetadataQueryProvider {

    @Override
    public String getColumnsQuery(String tableName) {
        return "SELECT COLUMN_NAME, DATA_TYPE FROM USER_TAB_COLUMNS WHERE TABLE_NAME = '" + tableName.toUpperCase() + "';";
    }

    @Override
    public String getIndexesQuery(String tableName) {
        return "SELECT INDEX_NAME FROM USER_INDEXES WHERE TABLE_NAME = '" + tableName.toUpperCase() + "';";
    }

    @Override
    public String getForeignKeysQuery(String tableName) {
        return "SELECT CONSTRAINT_NAME FROM USER_CONSTRAINTS WHERE TABLE_NAME = '" + tableName.toUpperCase() + "' AND CONSTRAINT_TYPE = 'R';";
    }

    @Override
    public String getReferencingForeignKeysQuery(String tableName) {
        return "SELECT CONSTRAINT_NAME FROM USER_CONSTRAINTS WHERE R_CONSTRAINT_NAME IN (SELECT CONSTRAINT_NAME FROM USER_CONSTRAINTS WHERE TABLE_NAME = '" + tableName.toUpperCase() + "' AND CONSTRAINT_TYPE = 'P');";
    }

    @Override
    public String getTriggersQuery(String tableName) {
        return "SELECT TRIGGER_NAME FROM USER_TRIGGERS WHERE TABLE_NAME = '" + tableName.toUpperCase() + "';";
    }

    @Override
    public String getTriggerFunctionsQuery(String tableName) {
        // Oracle에서는 트리거 함수 이름을 함께 가져오는 정보가 필요하므로 적절한 쿼리 작성
        return "SELECT TRIGGER_NAME, TRIGGERING_EVENT FROM USER_TRIGGERS WHERE TABLE_NAME = '" + tableName.toUpperCase() + "';";
    }

    @Override
    public String getConstraintsQuery(String tableName) {
        return "SELECT CONSTRAINT_NAME, CONSTRAINT_TYPE FROM USER_CONSTRAINTS WHERE TABLE_NAME = '" + tableName.toUpperCase() + "';";
    }
}