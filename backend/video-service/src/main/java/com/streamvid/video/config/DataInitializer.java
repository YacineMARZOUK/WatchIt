package com.streamvid.video.config;

import com.streamvid.video.entity.Video;
import com.streamvid.video.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final VideoRepository videoRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (videoRepository.count() == 0) {
            log.info("Database empty. Initializing test video data...");

            Video naruto = Video.builder()
                    .title("Naruto: Shippuden")
                    .description(
                            "It has been two and a half years since Naruto Uzumaki left Konohagakure, the Hidden Leaf Village, for intense training following events which fueled his desire to be stronger.")
                    .thumbnailUrl("https://images.unsplash.com/photo-1614583225154-5fcdda07019e?w=800&q=80") // Placeholder
                                                                                                             // Anime-like
                                                                                                             // Image
                    .trailerUrl("https://www.youtube.com/embed/1-qZqE9yIqw") // Embed URL
                    .duration("24m")
                    .releaseYear(2007)
                    .type("Series")
                    .categoryId("anime")
                    .rating(8.7)
                    .director("Hayato Date")
                    .castMembers(List.of("Junko Takeuchi", "Chie Nakamura", "Noriaki Sugiyama"))
                    .build();

            Video demonSlayer = Video.builder()
                    .title("Demon Slayer: Kimetsu no Yaiba")
                    .description(
                            "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly.")
                    .thumbnailUrl("https://images.unsplash.com/photo-1578632292335-df3f37b9ce75?w=800&q=80")
                    .trailerUrl("https://www.youtube.com/embed/VQGCKyvzIM4")
                    .duration("24m")
                    .releaseYear(2019)
                    .type("Series")
                    .categoryId("anime")
                    .rating(8.7)
                    .director("Haruo Sotozaki")
                    .castMembers(List.of("Natsuki Hanae", "Akari Kito", "Hiro Shimono"))
                    .build();

            Video aot = Video.builder()
                    .title("Attack on Titan")
                    .description(
                            "After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.")
                    .thumbnailUrl("https://images.unsplash.com/photo-1580477651031-1e9bf4d26214?w=800&q=80") // Sword/Action
                                                                                                             // theme
                    .trailerUrl("https://www.youtube.com/embed/MGRm4IzK1SQ")
                    .duration("24m")
                    .releaseYear(2013)
                    .type("Series")
                    .categoryId("anime")
                    .rating(9.1)
                    .director("Tetsurō Araki")
                    .castMembers(List.of("Yuki Kaji", "Yui Ishikawa", "Marina Inoue"))
                    .build();

            Video spiritedAway = Video.builder()
                    .title("Spirited Away")
                    .description(
                            "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.")
                    .thumbnailUrl("https://images.unsplash.com/photo-1520698305367-ece229a43a6d?w=800&q=80") // Mystical
                                                                                                             // theme
                    .trailerUrl("https://www.youtube.com/embed/ByXuk9QqQkk")
                    .duration("2h 5m")
                    .releaseYear(2001)
                    .type("Movie")
                    .categoryId("anime")
                    .rating(8.6)
                    .director("Hayao Miyazaki")
                    .castMembers(List.of("Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"))
                    .build();

            Video yourName = Video.builder()
                    .title("Your Name.")
                    .description(
                            "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?")
                    .thumbnailUrl("https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80") // Sky/stars
                                                                                                             // theme
                    .trailerUrl("https://www.youtube.com/embed/xU47nhruN-Q")
                    .duration("1h 46m")
                    .releaseYear(2016)
                    .type("Movie")
                    .categoryId("anime")
                    .rating(8.4)
                    .director("Makoto Shinkai")
                    .castMembers(List.of("Ryunosuke Kamiki", "Mone Kamishiraishi", "Ryo Narita"))
                    .build();

            videoRepository.saveAll(List.of(naruto, demonSlayer, aot, spiritedAway, yourName));
            videoRepository.flush();
            log.info("Finished inserting 5 test videos into the database.");
        } else {
            log.info("Database already contains videos. Skipping initialization.");
        }
    }
}
