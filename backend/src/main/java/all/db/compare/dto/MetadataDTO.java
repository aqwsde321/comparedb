package all.db.compare.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
public class MetadataDTO {
    private List<Map<String, Object>> db; // DB 이름을 리스트로 변경
    private List<Map<String, Object>> tableName; // 테이블 이름을 리스트로 변경
    private List<Map<String, Object>> columns; // 컬럼 정보
    private List<Map<String, Object>> indexes; // 인덱스 정보
    private List<Map<String, Object>> foreignKeyConstraints; // 외래 키 제약 조건
    private List<Map<String, Object>> referencingForeignKeyConstraints; // 참조 외래 키 제약 조건
    private List<Map<String, Object>> triggers; // 트리거 정보
    private List<Map<String, Object>> triggerFunctions; // 트리거 함수 정보
    private List<Map<String, Object>> constraints; // 제약 조건 정보

}