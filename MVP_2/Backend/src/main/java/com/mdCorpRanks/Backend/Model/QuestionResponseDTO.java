package com.mdCorpRanks.Backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponseDTO {
    private int id;
    private String title;
    private String subtitle;
    private double weight; 
}
