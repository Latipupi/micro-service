package com.student.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SchoolDTO {
    private int id;
    private String schoolName;
    private String location;
    private String principalName;
}
