const API_KEY = "AIzaSyBvd13qA5eREvO5Nz8FulkSvi25zfYIKQY";
let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  });
}

async function loadVideo() {
  const videoId = document.getElementById("videoId").value;

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,contentDetails,statistics,status`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const videoDetails = data.items[0].snippet;

      document.getElementById("videoTitle").innerText = videoDetails.title;

      if (player && typeof player.cueVideoById === "function") {
        player.cueVideoById(videoId);
      } else {
        console.error(
          "YouTube player not initialized or cueVideoById not available."
        );
      }
    } else {
      console.error("Video not found or invalid video ID.");
    }
  } catch (error) {
    console.error("Error fetching video details:", error);
  }
}
