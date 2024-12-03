package all.db.compare.dto;

import all.db.compare.rdbms.enums.DatabaseType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueryResultDTO {
    private List<Map<String, Object>> result;
    private List<Map<String, Object>> explainResult;
    private DatabaseType dbType;
    private String filteredSql;
    private String errorMessage;
}
