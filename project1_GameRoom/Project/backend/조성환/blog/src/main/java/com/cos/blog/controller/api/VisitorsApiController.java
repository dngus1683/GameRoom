package com.cos.blog.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cos.blog.config.auth.PrincipalDetail;
import com.cos.blog.dto.ResponseDto;
import com.cos.blog.model.Visitors;
import com.cos.blog.service.VisitorsService;

@RestController
public class VisitorsApiController {
	
	@Autowired
	private VisitorsService visitorsService;
	
	@PostMapping("/api/visitors")
	public ResponseDto<Integer> vSave(@RequestBody Visitors visitors, @AuthenticationPrincipal PrincipalDetail principal){
		visitorsService.글쓰기(visitors, principal.getUser());
		return new ResponseDto<Integer>(HttpStatus.OK.value(),1);
	}
	
	@DeleteMapping("/api/visitors/{id}")
	public ResponseDto<Integer> vDeleteById(@PathVariable int id, @AuthenticationPrincipal PrincipalDetail principal){
		visitorsService.글삭제하기(id,principal);
		return new ResponseDto<Integer>(HttpStatus.OK.value(),1);
	}
	
	@PutMapping("/api/visitors/{id}")
	public ResponseDto<Integer> vUpdate(@PathVariable int id, @RequestBody Visitors visitors){
		visitorsService.글수정하기(id,visitors);
		return new ResponseDto<Integer>(HttpStatus.OK.value(),1);
	}
}
