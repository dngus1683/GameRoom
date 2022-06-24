package com.cos.blog.dto;

import com.cos.blog.model.Board;
import com.cos.blog.model.Visitors;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VisitorsResponseDto {
	String url;
	Visitors visitors;
	int id;
}
