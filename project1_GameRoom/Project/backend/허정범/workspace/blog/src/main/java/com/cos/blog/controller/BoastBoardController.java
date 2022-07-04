package com.cos.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.cos.blog.dto.BoastBoardPageResponseDto;
import com.cos.blog.dto.BoastBoardReplyUpdateResponseDto;
import com.cos.blog.dto.BoastBoardResponseDto;
import com.cos.blog.model.BoastBoard;
import com.cos.blog.service.BoastBoardService;

@RestController
public class BoastBoardController {

	@Autowired
	private BoastBoardService boastBoardService;
	
	@GetMapping("/boastBoard")
	public BoastBoardPageResponseDto index(@PageableDefault(size=3,
	sort="id", direction=Sort.Direction.DESC)Pageable pageable) {
		Page<BoastBoard> page = boastBoardService.글목록(pageable);
		BoastBoardPageResponseDto boastBoardResponseDto = new BoastBoardPageResponseDto();
		boastBoardResponseDto.setPage(page);
		return boastBoardResponseDto;
	}
	
	@GetMapping("/boastBoard/{id}")
	public BoastBoardResponseDto findById(@PathVariable int id) {
		BoastBoardResponseDto boastBoardResponseDto = new BoastBoardResponseDto();
		boastBoardResponseDto.setBoastBoard(boastBoardService.글상세보기(id));
		return boastBoardResponseDto;
	}
	
	@GetMapping("/boastBoard/{id}/updateForm")
	public BoastBoardResponseDto updateForm(@PathVariable int id) {
		BoastBoardResponseDto boastBoardResponseDto = new BoastBoardResponseDto();
		boastBoardResponseDto.setBoastBoard(boastBoardService.글상세보기(id));
		return boastBoardResponseDto;
	}
	
	@GetMapping("/boastBoard/{boastBoardId}/{replyId}/updateForm")
	public BoastBoardReplyUpdateResponseDto replyUpdateForm(@PathVariable int boastBoardId, @PathVariable int replyId) {
		BoastBoardReplyUpdateResponseDto boastBoardReplyUpdateResponseDto = new BoastBoardReplyUpdateResponseDto();
		boastBoardReplyUpdateResponseDto.setBoastBoard(boastBoardService.글상세보기(boastBoardId));
		boastBoardReplyUpdateResponseDto.setReplyId(replyId);
		
		return boastBoardReplyUpdateResponseDto;
	}
}
