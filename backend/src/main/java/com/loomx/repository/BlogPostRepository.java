package com.loomx.repository;

import com.loomx.model.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    List<BlogPost> findByPublishedTrueOrderByCreatedAtDesc();
    Optional<BlogPost> findBySlug(String slug);
    boolean existsBySlug(String slug);
    List<BlogPost> findAllByOrderByCreatedAtDesc();
}
