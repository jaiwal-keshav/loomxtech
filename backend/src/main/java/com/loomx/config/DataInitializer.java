package com.loomx.config;

import com.loomx.model.AdminUser;
import com.loomx.model.BlogPost;
import com.loomx.repository.AdminUserRepository;
import com.loomx.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final AdminUserRepository adminUserRepository;
    private final BlogPostRepository blogPostRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${loomx.admin.username}")
    private String adminUsername;
    @Value("${loomx.admin.password}")
    private String adminPassword;
    @Value("${loomx.admin.email}")
    private String adminEmail;

    public DataInitializer(AdminUserRepository adminUserRepository,
                           BlogPostRepository blogPostRepository,
                           PasswordEncoder passwordEncoder) {
        this.adminUserRepository = adminUserRepository;
        this.blogPostRepository = blogPostRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Seed default admin
        if (!adminUserRepository.existsByUsername(adminUsername)) {
            AdminUser admin = new AdminUser();
            admin.setUsername(adminUsername);
            admin.setPasswordHash(passwordEncoder.encode(adminPassword));
            admin.setEmail(adminEmail);
            admin.setRole("ADMIN");
            adminUserRepository.save(admin);
            System.out.println(">> Seeded default admin user: " + adminUsername);
        }

        // Seed a sample published blog post
        if (blogPostRepository.count() == 0) {
            BlogPost post = new BlogPost();
            post.setSlug("from-idea-to-app-how-we-ship-fast");
            post.setTitle("From Idea to App: How We Ship Fast Without Breaking Things");
            post.setExcerpt("A look at LoomX's product-minded engineering process — how we take startups from prototype to production with scalable systems and human-centered design.");
            post.setContent("""
                    ## Building with intent

                    At LoomX Technologies we believe great software is born from a tight loop
                    between **product thinking**, **human-centered design**, and **scalable engineering**.

                    ### Our process
                    1. **Discover** — understand the problem and the people.
                    2. **Prototype** — validate fast with lightweight builds.
                    3. **Engineer** — production-grade, observable, scalable systems.
                    4. **Scale** — automation, cloud infrastructure, and continuous delivery.

                    Whether you need end-to-end software development, AI implementation, or cloud
                    infrastructure management, our teams in Chhatrapati Sambhajinagar and Pune help
                    you move faster from prototype to production.
                    """);
            post.setAuthor("LoomX Team");
            post.setTags("engineering,product,startups");
            post.setCoverImage("");
            post.setPublished(true);
            blogPostRepository.save(post);
            System.out.println(">> Seeded sample blog post.");
        }
    }
}
