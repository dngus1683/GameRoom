package com.cos.blog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cos.blog.config.auth.PrincipalDetail;
import com.cos.blog.dto.BoastBoardReplySaveRequestDto;
import com.cos.blog.model.BoastBoard;
import com.cos.blog.model.BoastBoardReply;
import com.cos.blog.model.User;
import com.cos.blog.repository.BoastBoardReplyRepository;
import com.cos.blog.repository.BoastBoardRepository;

// 스프링이 컴포넌트 스캔을 통해서 Bean에 등록을 해줌. IoC를 해준다.
@Service
public class BoastBoardService {

	@Autowired
	private BoastBoardRepository boastBoardRepository;
	
	@Autowired
	private BoastBoardReplyRepository boastBoardReplyRepository;

	@Transactional
	public void 글쓰기(BoastBoard boastBoard, User user) { // 받는것 title, content
		boastBoard.setCount(0);
		boastBoard.setUser(user);
		boastBoardRepository.save(boastBoard);
	}

	@Transactional(readOnly = true)
	public Page<BoastBoard> 글목록(Pageable pageable) {
		return boastBoardRepository.findAll(pageable);
	}

	public BoastBoard 글상세보기(int id) { // optional return
		return boastBoardRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("글 상세보기 실패 : 아이디를 찾을 수 없습니다.");
		});
	}

	@Transactional
	public void 글삭제하기(int id, PrincipalDetail principal) {
		BoastBoard boastBoard = boastBoardRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("글 찾기 실패 : 해당 글이 존재하지 않습니다.");
		});

		if (boastBoard.getUser().getId() != principal.getUser().getId()) {
			throw new IllegalStateException("글 삭제 실패 : 해당 글을 삭제할 권한이 없습니다.");
		}
		boastBoardRepository.deleteById(id);
	}

	@Transactional
	public void 글수정하기(int id, BoastBoard requestBoastBoard, PrincipalDetail principal) {
		BoastBoard boastBoard = boastBoardRepository.findById(id).orElseThrow(() -> {
			return new IllegalArgumentException("글 찾기 실패 : 아이디를 찾을 수 없습니다.");
		});	//영속화 완료
		
		if (boastBoard.getUser().getId() != principal.getUser().getId()) {
			throw new IllegalStateException("글 수정 실패 : 해당 글을 수정할 권한이 없습니다.");
		}
		
		boastBoard.setTitle(requestBoastBoard.getTitle());
		boastBoard.setContent(requestBoastBoard.getContent());
		// 해당 함수 종료시(Service가 종료될 때) 트랜잭션이 종료됩니다. 이때 더티체킹 - 자동 업데이트. db flush
	}
	
	@Transactional
	public void 댓글쓰기(BoastBoardReplySaveRequestDto boastboardreplySaveRequestDto) {
		int result = boastBoardReplyRepository.mSave(boastboardreplySaveRequestDto.getUserId(), boastboardreplySaveRequestDto.getBoastBoardId(), boastboardreplySaveRequestDto.getContent());
		System.out.println("BoastBoardService : "+result);
	}
	
	@Transactional
	public void 댓글삭제(int replyId, PrincipalDetail principal) {
		BoastBoardReply boastboardreply = boastBoardReplyRepository.findById(replyId).orElseThrow(() -> {
			return new IllegalArgumentException("댓글 찾기 실패 : 아이디를 찾을 수 없습니다.");
		});
		
		if (boastboardreply.getUser().getId() != principal.getUser().getId()) {
			throw new IllegalStateException("댓글 삭제 실패 : 댓글을 삭제할 권한이 없습니다.");
		}
		
		boastBoardReplyRepository.deleteById(replyId);
	}
	
	@Transactional
	public void 댓글수정하기(int replyId, BoastBoardReply requestboastboardreply, PrincipalDetail principal) {
		BoastBoardReply boastboardreply = boastBoardReplyRepository.findById(replyId).orElseThrow(() -> {
			return new IllegalArgumentException("댓글 찾기 실패 : 아이디를 찾을 수 없습니다.");
		});	//영속화 완료
		
		if (boastboardreply.getUser().getId() != principal.getUser().getId()) {
			throw new IllegalStateException("댓글 수정 실패 : 댓글을 수정할 권한이 없습니다.");
		}
		
		boastboardreply.setContent(requestboastboardreply.getContent());
		System.out.println("댓글 수정 완료");
	}
}