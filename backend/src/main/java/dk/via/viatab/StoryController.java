package dk.via.viatab;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stories")
@CrossOrigin(origins = "*")
public class StoryController {
    private final StoryRepository storyRepository;

    public StoryController(StoryRepository storyRepository) {
        this.storyRepository = storyRepository;
    }

    @GetMapping
    public List<Story> getStories() {
        return storyRepository.findAll();
    }

    @PostMapping
    public Story addStory(@Valid @RequestBody Story story) {
        return storyRepository.save(story);
    }

    @DeleteMapping("/{id}")
    public void deleteStory(@PathVariable Long id) {
        storyRepository.deleteById(id);
    }
}
