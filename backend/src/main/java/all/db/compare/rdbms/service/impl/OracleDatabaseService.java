package all.db.compare.rdbms.service.impl;

import all.db.compare.dto.MetadataDTO;
import all.db.compare.dto.QueryResultDTO;
import all.db.compare.rdbms.enums.DatabaseType;
import all.db.compare.rdbms.metadata.MetadataQueryProvider;
import all.db.compare.rdbms.service.DatabaseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service("ORACLE")
public class OracleDatabaseService implements DatabaseService {

    private final JdbcTemplate jdbcTemplate;

    private final MetadataQueryProvider metadataQueryProvider;

    @Autowired
    public OracleDatabaseService(@Qualifier("oracleJdbcTemplate") JdbcTemplate jdbcTemplate,
                                 @Qualifier("oracleMetadataQueryProvider") MetadataQueryProvider metadataQueryProvider) {
        this.jdbcTemplate = jdbcTemplate;
        this.jdbcTemplate.execute("SELECT 1 FROM DUAL");
        this.metadataQueryProvider = metadataQueryProvider;
    }

    @Override
    public QueryResultDTO executeQuery(String sql) {
        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql);
        List<Map<String, Object>> executionPlan = getExecutionPlan(sql); // MariaDB에 맞는 실행 계획 로직 구현
        return new QueryResultDTO(results, executionPlan, DatabaseType.ORACLE, sql, null);
    }

    @Override
    public MetadataDTO getMetadata(String tableName) {
        // 조회 로직 구현
        return null;
    }

    private List<Map<String, Object>> getExecutionPlan(String sql) {
        List<Map<String, Object>> executionPlan = new ArrayList<>();
        try {
            jdbcTemplate.execute("EXPLAIN PLAN FOR " + sql);
            executionPlan = jdbcTemplate.queryForList("SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY)");
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return executionPlan;
    }
}