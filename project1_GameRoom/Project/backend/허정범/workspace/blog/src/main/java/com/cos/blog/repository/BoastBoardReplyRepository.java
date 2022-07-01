package com.cos.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.cos.blog.model.BoastBoardReply;

public interface BoastBoardReplyRepository extends JpaRepository<BoastBoardReply, Integer> {
	
	@Modifying
	@Query(value = "INSERT INTO boastboardreply(userId, boastBoardId, content, createDate) VALUES(?1, ?2, ?3, now())", nativeQuery = true)
	int mSave(int userId, int boastBoardId, String content);	// 업데이트된 행의 개수를 리턴해줌.
}
