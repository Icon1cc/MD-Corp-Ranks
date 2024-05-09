package com.mdCorpRanks.Backend.Service;

import com.mdCorpRanks.Backend.Model.QuestionResponseDTO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final JdbcTemplate jdbcTemplate;

    public List<QuestionResponseDTO> getAllQuestions() {
        String sql = "SELECT \"ID\", \"Title\", \"Subtitle\", \"Weight\" FROM question";
        return jdbcTemplate.query(sql, new RowMapper<QuestionResponseDTO>() {
            @Override
            public QuestionResponseDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new QuestionResponseDTO(
                    rs.getInt("ID"),
                    rs.getString("Title"),
                    rs.getString("Subtitle"),
                    rs.getDouble("Weight")
                );
            }
        });
    }
}
