import { Router } from "express";

import * as Controller from "./controller";

const playlist_router = Router();

playlist_router.route("/").get(Controller.findAllPlaylists);
//playlist_router.route("/").post(Controller.createPlaylist);
playlist_router.route("/").post(Controller.createOrUpdatePlaylist);
playlist_router.route("/").put(Controller.addSongToPlaylists);

export default playlist_router;
