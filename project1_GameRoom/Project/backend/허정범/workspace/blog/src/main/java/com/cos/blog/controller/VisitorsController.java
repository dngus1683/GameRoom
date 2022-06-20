package com.cos.blog.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.blog.dto.VisitorsPageResponseDto;
import com.cos.blog.model.Visitors;
import com.cos.blog.service.VisitorsService;


@RestController
public class VisitorsController {
	
	@Autowired
	private VisitorsService visitorsService;
	
	@GetMapping("/visitors")
	public VisitorsPageResponseDto index(@PageableDefault(size=6,
	sort="id",direction = Sort.Direction.DESC)Pageable pageable) {
		Page<Visitors> page = visitorsService.글목록(pageable);
		VisitorsPageResponseDto visitorsPageResponseDto = new VisitorsPageResponseDto();
		visitorsPageResponseDto.setUrl("visitors.jsp");
		visitorsPageResponseDto.setPage(page);
		return visitorsPageResponseDto;	
	}
}
