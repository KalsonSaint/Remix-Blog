import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import globalStyle from "~/styles/global.css";
import { getUser } from "./utils/session.server";

export const loader = async ({ request }) => {
  const user = await getUser(request);
  const data = {
    user,
  };

  return data;
};

export function meta() {
  return {
    title: "Remix Blog",
    description: "Cool blog built with remix",
    keywords: "remix, react, javascript",
  };
}

export const links = () => [{ rel: "stylesheet", href: globalStyle }];

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

const Document = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
};

const Layout = ({ children }) => {
  const { user } = useLoaderData();

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Remix
        </Link>
        <ul className="nav">
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          {user ? (
            <li>
              <form action="'/auth/logout" method="POST">
                <button className="btn btn-delete">Logout</button>
              </form>
            </li>
          ) : (
            <li>
              <Link to="/auth/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="container">{children}</div>
    </>
  );
};

export function ErrorBoundary({ error }) {
  console.log(error);
  return (
    <Document>
      <Layout>
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  );
}
