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
        path: "username",
        element: <UsernameRoute key={"username"} />,
      },
      { path: "setup", element: <SetupRoute key={"setup"} /> },
      {
        path: "pay/:username",
        element: <PayRoute />,
        loader: async ({ params }) => {
          if (!params.username) {
            throw new Response("Not Found", { status: 404 });
          }
          const isNpub = params.username?.startsWith("npub");
          if (!isNpub) {
            const res = await fetch(
              `${import.meta.env.NPC_SERVER_URL}/.well-known/nostr.json?name=${params.username}`,
            );
            const data = await res.json();
            if (Object.keys(data.names).length === 0) {
              throw new Response("Not Found", { status: 404 });
            }
            return {
              username: params.username,
              pubkey: data.names[params.username],
            };
          } else {
            try {
              const pubkey = nip19.decode(
                params.username as `npub1${string}`,
              ).data;
              return {
                username: null,
                pubkey,
              };
            } catch {
              throw new Response("Not Found", { status: 404 });
            }
          }
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SdkProvider>
    <RouterProvider router={router} />
  </SdkProvider>,
);
