import { IVideo } from '../interfaces/IVideo';

export class VideoService {
    public static async getVideos(): Promise<IVideo[]> {
        try {
            const response = await fetch('https://api.myjson.com/bins/so5pk');
            const videos = await response.json();
            return videos as IVideo[];
        } catch (e) {
            // If there is error during fetch video list, return empty array.
            console.error(e);
            return [];
        }
    }
}
