package com.cos.blog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cos.blog.config.auth.PrincipalDetail;
import com.cos.blog.model.User;
import com.cos.blog.model.Visitors;
import com.cos.blog.repository.VisitorsRepository;

@Service
public class VisitorsService {
	
		
	@Autowired
	private VisitorsRepository visitorsRepository;
	
	@Transactional(readOnly = true)
	public Page<Visitors> 글목록(Pageable pageable){
		return visitorsRepository.findAll(pageable);
	}
	
	@Transactional
	public void 글쓰기(Visitors visitors, User user) {
		visitors.setUser(user);
		visitorsRepository.save(visitors);
	}
	
	@Transactional
	public void 글삭제하기(int id, PrincipalDetail principal) {
		Visitors visitors = visitorsRepository.findById(id).orElseThrow(()->{
			return new IllegalArgumentException("방명록 찾기 실패 : 해당 방명록이 존재하지 않습니다.");
		});
		
		if (visitors.getUser().getId() != principal.getUser().getId()) {
			throw new IllegalStateException("글 삭제 실패 : 해당 글을 삭제할 권한이 없습니다.");
		}
		visitorsRepository.deleteById(id);
	}
	
}
