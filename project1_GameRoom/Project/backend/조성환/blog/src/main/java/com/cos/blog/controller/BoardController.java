/*
 * package com.cos.blog.controller;
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.data.domain.Pageable; import
 * org.springframework.data.domain.Sort; import
 * org.springframework.data.web.PageableDefault; import
 * org.springframework.security.core.annotation.AuthenticationPrincipal; import
 * org.springframework.stereotype.Controller; import
 * org.springframework.ui.Model; import
 * org.springframework.web.bind.annotation.GetMapping; import
 * org.springframework.web.bind.annotation.PathVariable;
 * 
 * import com.cos.blog.config.auth.PrincipalDetail; import
 * com.cos.blog.service.BoardService;
 * 
 * @Controller public class BoardController {
 * 
 * @Autowired private BoardService boardService;
 * 
 * // /WEB-INF/views/index.jspillegalargumentexception // 컨트롤러에서 세션을 어떻게 찾는지? //
 * 글을 보여주려면 index로 갈 때 데이터를 가져가야함.
 * 
 * @GetMapping({"","/"}) public String index(Model
 * model, @PageableDefault(size=3, sort="id", direction =
 * Sort.Direction.DESC)Pageable pageable) { //Model을 이용하여 view에게 데이터를 전달
 * model.addAttribute("boards", boardService.글목록(pageable));
 * //addAttribute("key", "value") return "index"; //viewResolver 작동!! }
 * 
 * @GetMapping("/board/{id}") public String findById(@PathVariable int id ,
 * Model model) { model.addAttribute("board", boardService.글상세보기(id));
 * System.out.println(); return "board/detail"; }
 * 
 * @GetMapping("/board/{id}/updateForm") public String updateForm(@PathVariable
 * int id, Model model) { model.addAttribute("board", boardService.글상세보기(id));
 * return "board/updateForm"; }
 * 
 * // USER 권한이 필요
 * 
 * @GetMapping("/board/saveForm") public String saveForm() { return
 * "board/saveForm"; }
 * 
 * @GetMapping("/board/{boardId}/{replyId}/updateForm") public String
 * replyUpdateForm(@PathVariable int boardId, @PathVariable int replyId, Model
 * model) { model.addAttribute("board", boardService.글상세보기(boardId)); return
 * "board/replyUpdateForm"; } }
 */