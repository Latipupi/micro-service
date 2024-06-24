package com.student.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentRespDTO {
    private Integer id;
    private String name;
    private int age;
    private String gender;
    private SchoolDTO school;
}
