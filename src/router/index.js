import Loai from "../loai/Loai";
import Login from "../components";
import AddSpaecies from "../loai/NewSpecies/AddSpaecies";
const publicRouter = [
  { path: "/", component: Login },
  { path: "/Loai", component: Loai },
  { path: "/them-moi", component: AddSpaecies },
];
const privateRoutes = [];
export { publicRouter, privateRoutes };
