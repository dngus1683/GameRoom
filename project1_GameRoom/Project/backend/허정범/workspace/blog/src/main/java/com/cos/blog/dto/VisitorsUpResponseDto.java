package com.cos.blog.dto;

import org.springframework.data.domain.Page;

import com.cos.blog.model.Visitors;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VisitorsUpResponseDto {
	String url;
}
