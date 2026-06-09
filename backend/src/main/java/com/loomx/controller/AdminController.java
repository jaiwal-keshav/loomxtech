package com.loomx.controller;

import com.loomx.dto.ApiResponse;
import com.loomx.model.BlogPost;
import com.loomx.model.ContactMessage;
import com.loomx.model.Consultation;
import com.loomx.model.ServiceRequest;
import com.loomx.repository.ContactMessageRepository;
import com.loomx.repository.ConsultationRepository;
import com.loomx.repository.ServiceRequestRepository;
import com.loomx.service.BlogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ConsultationRepository consultationRepository;
    private final ServiceRequestRepository serviceRequestRepository;
    private final ContactMessageRepository contactMessageRepository;
    private final BlogService blogService;

    public AdminController(ConsultationRepository consultationRepository,
                           ServiceRequestRepository serviceRequestRepository,
                           ContactMessageRepository contactMessageRepository,
                           BlogService blogService) {
        this.consultationRepository = consultationRepository;
        this.serviceRequestRepository = serviceRequestRepository;
        this.contactMessageRepository = contactMessageRepository;
        this.blogService = blogService;
    }

    // ----- Dashboard summary -----
    @GetMapping("/summary")
    public Map<String, Long> summary() {
        return Map.of(
                "consultations", consultationRepository.count(),
                "serviceRequests", serviceRequestRepository.count(),
                "contacts", contactMessageRepository.count(),
                "blogPosts", (long) blogService.listAll().size()
        );
    }

    // ----- Leads -----
    @GetMapping("/consultations")
    public List<Consultation> consultations() {
        return consultationRepository.findAll();
    }

    @GetMapping("/service-requests")
    public List<ServiceRequest> serviceRequests() {
        return serviceRequestRepository.findAll();
    }

    @GetMapping("/contacts")
    public List<ContactMessage> contacts() {
        return contactMessageRepository.findAll();
    }

    // ----- Blog management -----
    @GetMapping("/blog")
    public List<BlogPost> allPosts() {
        return blogService.listAll();
    }

    @GetMapping("/blog/{id}")
    public BlogPost getPost(@PathVariable Long id) {
        return blogService.getById(id);
    }

    @PostMapping("/blog")
    public BlogPost createPost(@RequestBody BlogPost post) {
        post.setId(null);
        return blogService.create(post);
    }

    @PutMapping("/blog/{id}")
    public BlogPost updatePost(@PathVariable Long id, @RequestBody BlogPost post) {
        return blogService.update(id, post);
    }

    @DeleteMapping("/blog/{id}")
    public ResponseEntity<ApiResponse> deletePost(@PathVariable Long id) {
        blogService.delete(id);
        return ResponseEntity.ok(new ApiResponse(true, "Post deleted."));
    }
}
