import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ChooseMode } from "./pages/ChooseMode";
import { BrandsStart } from "./pages/BrandsStart";
import { BrandsClaimBuilder } from "./pages/BrandsClaimBuilder";
import { BrandsResults } from "./pages/BrandsResults";
import { BrandsExport } from "./pages/BrandsExport";
import { ConsumerSearch } from "./pages/ConsumerSearch";
import { ConsumerResults } from "./pages/ConsumerResults";
import { About } from "./pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "choose-mode", Component: ChooseMode },
      { path: "brands/start", Component: BrandsStart },
      { path: "brands/builder", Component: BrandsClaimBuilder },
      { path: "brands/results", Component: BrandsResults },
      { path: "brands/export", Component: BrandsExport },
      { path: "consumer/search", Component: ConsumerSearch },
      { path: "consumer/results", Component: ConsumerResults },
      { path: "about", Component: About },
    ],
  },
]);
