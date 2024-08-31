import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeRoute from "./routes/home/HomeRoute";
import RootRoute from "./routes/RootRoute";
import ClaimRoute from "./routes/claim/ClaimRoute";
import UsernameRoute from "./routes/username/UsernameRoute";
import { SimplePool, nip19 } from "nostr-tools";
import { SdkProvider } from "./hooks/providers/SdkProvider";
import SetupRoute from "./routes/setup/SetupRoute";
import PayRoute from "./routes/pay/PayRoute";
import HistoryRoute from "./routes/history/HistoryRoute";

declare global {
  interface Window {
    nostr: {
      getPublicKey: () => Promise<string>;
      signEvent: (e: {
        kind: number;
        content: string;
        created_at: number;
        tags: string[][];
      }) => Promise<{
        kind: number;
        content: string;
        created_at: number;
        tags: string[][];
        id: string;
        sig: string;
        pubkey: string;
      }>;
    };
  }
}

export const pool = new SimplePool();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute key={"root"} />,
    children: [
      {
        path: "",
        element: <HomeRoute key={"home"} />,
      },
      {
        path: "claim",
        element: <ClaimRoute key={"claim"} />,
      },
      {
        path: "history",
        element: <HistoryRoute key={"history"} />,
      },
      {
        path: "username",
        element: <UsernameRoute key={"username"} />,
      },
      { path: "setup", element: <SetupRoute key={"setup"} /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SdkProvider>
    <RouterProvider router={router} />
  </SdkProvider>,
);
