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
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PublicController {

    private final ConsultationRepository consultationRepository;
    private final ServiceRequestRepository serviceRequestRepository;
    private final ContactMessageRepository contactMessageRepository;
    private final BlogService blogService;

    public PublicController(ConsultationRepository consultationRepository,
                            ServiceRequestRepository serviceRequestRepository,
                            ContactMessageRepository contactMessageRepository,
                            BlogService blogService) {
        this.consultationRepository = consultationRepository;
        this.serviceRequestRepository = serviceRequestRepository;
        this.contactMessageRepository = contactMessageRepository;
        this.blogService = blogService;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP", "service", "loomx-backend");
    }

    @PostMapping("/consultations")
    public ResponseEntity<ApiResponse> bookConsultation(@Valid @RequestBody Consultation consultation) {
        consultation.setId(null);
        consultation.setStatus("NEW");
        consultationRepository.save(consultation);
        return ResponseEntity.ok(new ApiResponse(true,
                "Thank you! Your consultation request has been received. We'll reach out shortly."));
    }

    @PostMapping("/service-requests")
    public ResponseEntity<ApiResponse> bookService(@Valid @RequestBody ServiceRequest request) {
        request.setId(null);
        request.setStatus("NEW");
        serviceRequestRepository.save(request);
        return ResponseEntity.ok(new ApiResponse(true,
                "Thank you! Your service request has been received. Our team will contact you soon."));
    }

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse> contact(@Valid @RequestBody ContactMessage message) {
        message.setId(null);
        message.setRead(false);
        contactMessageRepository.save(message);
        return ResponseEntity.ok(new ApiResponse(true, "Message sent! We'll get back to you soon."));
    }

    @GetMapping("/blog")
    public List<BlogPost> listBlog() {
        return blogService.listPublished();
    }

    @GetMapping("/blog/{slug}")
    public BlogPost getBlog(@PathVariable String slug) {
        return blogService.getBySlug(slug);
    }
}
