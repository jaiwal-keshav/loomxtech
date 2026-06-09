package com.loomx.service;

import com.loomx.model.BlogPost;
import com.loomx.repository.BlogPostRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

@Service
public class BlogService {

    private final BlogPostRepository repository;

    public BlogService(BlogPostRepository repository) {
        this.repository = repository;
    }

    public List<BlogPost> listPublished() {
        return repository.findByPublishedTrueOrderByCreatedAtDesc();
    }

    public List<BlogPost> listAll() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public BlogPost getBySlug(String slug) {
        return repository.findBySlug(slug)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));
    }

    public BlogPost getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));
    }

    public BlogPost create(BlogPost post) {
        if (post.getSlug() == null || post.getSlug().isBlank()) {
            post.setSlug(slugify(post.getTitle()));
        }
        ensureUniqueSlug(post);
        return repository.save(post);
    }

    public BlogPost update(Long id, BlogPost incoming) {
        BlogPost existing = getById(id);
        existing.setTitle(incoming.getTitle());
        existing.setExcerpt(incoming.getExcerpt());
        existing.setContent(incoming.getContent());
        existing.setCoverImage(incoming.getCoverImage());
        existing.setAuthor(incoming.getAuthor());
        existing.setTags(incoming.getTags());
        existing.setPublished(incoming.isPublished());
        if (incoming.getSlug() != null && !incoming.getSlug().isBlank()
                && !incoming.getSlug().equals(existing.getSlug())) {
            existing.setSlug(incoming.getSlug());
            ensureUniqueSlug(existing);
        }
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private void ensureUniqueSlug(BlogPost post) {
        String base = post.getSlug();
        String candidate = base;
        int i = 1;
        while (repository.existsBySlug(candidate)
                && (post.getId() == null
                    || !repository.findBySlug(candidate).map(BlogPost::getId).orElse(-1L).equals(post.getId()))) {
            candidate = base + "-" + i++;
        }
        post.setSlug(candidate);
    }

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public static String slugify(String input) {
        if (input == null) return "post";
        String nowhitespace = WHITESPACE.matcher(input.trim()).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        slug = slug.toLowerCase(Locale.ENGLISH).replaceAll("-{2,}", "-").replaceAll("^-|-$", "");
        return slug.isBlank() ? "post" : slug;
    }
}
