package com.cos.blog.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


import com.cos.blog.dto.BoardResponseDto;
import com.cos.blog.dto.PageResponseDto;
import com.cos.blog.dto.ReplyUpdateResponseDto;
import com.cos.blog.dto.SaveFormResponseDto;
import com.cos.blog.model.Board;
import com.cos.blog.service.BoardService;

@RestController
public class NewBoardController {

	@Autowired
	private BoardService boardService;
	
	
	
	// /WEB-INF/views/index.jspillegalargumentexception
	// 컨트롤러에서 세션을 어떻게 찾는지?
	// 글을 보여주려면 index로 갈 때 데이터를 가져가야함.
	@GetMapping({"/board"})
	public PageResponseDto index(@PageableDefault(size=5, 
	sort="id", direction = Sort.Direction.DESC)Pageable pageable) {	//Model을 이용하여 view에게 데이터를 전달
		//model.addAttribute("boards", boardService.글목록(pageable));	//addAttribute("key", "value")
		Page<Board> page =  boardService.글목록(pageable);
		PageResponseDto pageResponseDto = new PageResponseDto();
		pageResponseDto.setUrl("index.jsp");
		pageResponseDto.setPage(page);
		return pageResponseDto;	//viewResolver  작동!!
	}
	
	@GetMapping("/board/{id}")
	public BoardResponseDto findById(@PathVariable int id) {
		//model.addAttribute("board", boardService.글상세보기(id));	
		BoardResponseDto boardResponseDto = new BoardResponseDto();
		Board board = boardService.글상세보기(id);
		boardResponseDto.setUrl("board/detail.jsp");
		boardResponseDto.setBoard(board);
		return boardResponseDto;
	}
	
	@GetMapping("/board/{id}/updateForm")
	public BoardResponseDto updateForm(@PathVariable int id) {
		//model.addAttribute("board", boardService.글상세보기(id));
		BoardResponseDto boardResponseDto = new BoardResponseDto();
		Board board = boardService.글상세보기(id);
		boardResponseDto.setUrl("board/updateForm.jsp");
		boardResponseDto.setBoard(board);
		return boardResponseDto;
	}
	
	// USER 권한이 필요
	@GetMapping("/board/saveForm")
	public SaveFormResponseDto saveForm() {
		SaveFormResponseDto saveFormResponseDto = new SaveFormResponseDto();
		saveFormResponseDto.setUrl("board/saveForm");
		return saveFormResponseDto;
	}
	
	@GetMapping("/board/{boardId}/{replyId}/updateForm")
	public ReplyUpdateResponseDto replyUpdateForm(@PathVariable int boardId, @PathVariable int replyId) {
		//model.addAttribute("board", boardService.글상세보기(boardId));
		ReplyUpdateResponseDto replyUpdateResponseDto = new ReplyUpdateResponseDto();
		Board board = boardService.글상세보기(boardId);
		replyUpdateResponseDto.setUrl("board/replyUpdateForm");
		replyUpdateResponseDto.setBoard(board);
		replyUpdateResponseDto.setReplyId(replyId);
		
		return replyUpdateResponseDto;
	}
}
