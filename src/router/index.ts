
import  * as Router  from "../components";

const listRoutes = [
  ["songs", Router.SongRouter],
  ["users", Router.UserRouter],
  ["playlist", Router.PlaylistRouter],
];


export const routes = (app:any) => {
  listRoutes.forEach(([path, controller]) => {
    app.use(`/api/v1/${path}`, controller);
  });
};