export const bindVideosEvents = () => {
  let videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    if (video.hasAttribute("show-controls-on-click")) {
      video.addEventListener("click", () => {
        if (!video.controls) {
          video.controls = true;
        }
      });
    }

    if (video.hasAttribute("toggle-muted")) {
      video.addEventListener("click", () => {
        video.muted = !video.muted;
      });
    }

    if (video.hasAttribute("pause-when-hidden")) {
      let playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then((_) => {
          let observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.intersectionRatio == 0 && !video.paused) {
                  video.pause();
                  video.muted = true;
                } else if (video.paused) {
                  video.play();
                }
              });
            },
            { threshold: 0 }
          );
          observer.observe(video);
        });
      }
    }
  });
};
