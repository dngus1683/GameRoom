package com.cos.blog.dto;

import com.cos.blog.model.BoastBoard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoastBoardResponseDto {
	BoastBoard boastBoard;
}
