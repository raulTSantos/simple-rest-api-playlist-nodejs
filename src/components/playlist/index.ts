import { Router } from "express";

import * as Controller from "./controller";

const playlist_router = Router();

playlist_router.route("/").get(Controller.findAllPlaylists);
playlist_router.route("/").post(Controller.createOrUpdatePlaylist);


export default playlist_router;
