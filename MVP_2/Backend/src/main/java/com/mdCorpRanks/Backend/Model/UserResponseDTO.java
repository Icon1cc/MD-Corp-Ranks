package com.mdCorpRanks.Backend.Model;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Getter
@Setter
public class UserResponseDTO {
    private String userId;
    private boolean reviewAlreadyGiven;
}
