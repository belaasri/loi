import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function YouTubeDownloader() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoData, setVideoData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      try {
        const response = await fetch(`/api/getVideoInfo?id=${videoId}`);
        const data = await response.json();
        setVideoData(data);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    }
  };

  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-4xl font-bold text-center text-foreground">YouTube Video Downloader</h1>
        <p className="text-center text-muted-foreground">Download online videos, download online video to mp3 for free</p>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Search keywords or paste video link here"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </Button>
        </form>
        {videoData && (
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{videoData.snippet.title}</h2>
            <img src={videoData.snippet.thumbnails.high.url} alt={videoData.snippet.title} className="w-full rounded-md mb-4" />
            <p className="mb-2"><strong>Views:</strong> {videoData.statistics.viewCount}</p>
            <p className="mb-2"><strong>Likes:</strong> {videoData.statistics.likeCount}</p>
            <p className="mb-4"><strong>Duration:</strong> {videoData.contentDetails.duration}</p>
            <Button className="w-full">Download MP4</Button>
            <Button className="w-full mt-2" variant="outline">Download MP3</Button>
          </div>
        )}
      </div>
    </div>
  );
}
