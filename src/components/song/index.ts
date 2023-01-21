
import { Router } from "express";

import * as Controller from "./controller";

const song_router = Router();

song_router.route("/").get(Controller.findAllSongs);
song_router.route("/").post(Controller.createSong);
song_router.route("/:id").get(Controller.findSongById);

export default song_router;

