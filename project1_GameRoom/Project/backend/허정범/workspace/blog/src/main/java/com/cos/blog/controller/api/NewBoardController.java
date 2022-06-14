package com.cos.blog.controller.api;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.cos.blog.config.auth.PrincipalDetail;
import com.cos.blog.dto.NewResponseDto;
import com.cos.blog.model.Board;
import com.cos.blog.service.BoardService;

@RestController
public class NewBoardController {

	@Autowired
	private BoardService boardService;
	
	
	
	// /WEB-INF/views/index.jspillegalargumentexception
	// 컨트롤러에서 세션을 어떻게 찾는지?
	// 글을 보여주려면 index로 갈 때 데이터를 가져가야함.
	@GetMapping({"","/"})
	public NewResponseDto index(@PageableDefault(size=3, 
	sort="id", direction = Sort.Direction.DESC)Pageable pageable) {	//Model을 이용하여 view에게 데이터를 전달
		//model.addAttribute("boards", boardService.글목록(pageable));	//addAttribute("key", "value")
		Page<Board> page =  boardService.글목록(pageable);
		NewResponseDto newResponseDto = new NewResponseDto();
		newResponseDto.setUrl("index.jsp");
		newResponseDto.setPage(page);
		return newResponseDto;	//viewResolver  작동!!
	}
	
	@GetMapping("/board/{id}")
	public NewResponseDto findById(@PathVariable int id) {
		//model.addAttribute("board", boardService.글상세보기(id));	
		NewResponseDto newResponseDto = new NewResponseDto();
		Board board = boardService.글상세보기(id);
		newResponseDto.setUrl("board/detail.jsp");
		newResponseDto.setBoard(board);
		return newResponseDto;
	}
	
	@GetMapping("/board/{id}/updateForm")
	public NewResponseDto updateForm(@PathVariable int id) {
		//model.addAttribute("board", boardService.글상세보기(id));
		NewResponseDto newResponseDto = new NewResponseDto();
		Board board = boardService.글상세보기(id);
		newResponseDto.setUrl("board/updateForm.jsp");
		newResponseDto.setBoard(board);
		return newResponseDto;
	}
	
	// USER 권한이 필요
	@GetMapping("/board/saveForm")
	public NewResponseDto saveForm() {
		NewResponseDto newResponseDto = new NewResponseDto();
		newResponseDto.setUrl("board/saveForm");
		return newResponseDto;
	}
	
	@GetMapping("/board/{boardId}/{replyId}/updateForm")
	public NewResponseDto replyUpdateForm(@PathVariable int boardId, @PathVariable int replyId) {
		//model.addAttribute("board", boardService.글상세보기(boardId));
		NewResponseDto newResponseDto = new NewResponseDto();
		Board board = boardService.글상세보기(boardId);
		newResponseDto.setUrl("board/replyUpdateForm");
		newResponseDto.setBoard(board);
		newResponseDto.setReplyId(replyId);
		
		return newResponseDto;
	}
}
