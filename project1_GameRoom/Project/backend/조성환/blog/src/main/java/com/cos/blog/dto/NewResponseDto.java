package com.cos.blog.dto;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import com.cos.blog.model.Board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewResponseDto {
	String url;
	
	Page<Board> page;
	
	Board board;
	
	int replyId;
}
