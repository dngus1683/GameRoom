package com.cos.blog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoastBoardReplySaveRequestDto {
	private int userId;
	private int boastBoardId;
	private String content;
}
