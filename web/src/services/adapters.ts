export interface Adapter {
  get: <T>(path: string, options?: { params?: Record<string, string> }) => T;
  put: <T>(
    path: string,
    options?: { params?: Record<string, string>; body: T },
  ) => T;
  post: <T>(
    path: string,
    options?: { params?: Record<string, string>; body: T },
  ) => T;
  delete: (path: string, options?: { params?: Record<string, string> }) => void;
}

export const lsAdapter: Adapter = {
  get: <T>(path: string, _options?: { params?: Record<string, string> }) => {
    const root = JSON.parse(localStorage.getItem("__root") ?? "{}") as Record<
      string,
      unknown
    >;
    const paths = path.split("/").filter((p) => p);
    const obj = getNested(root, paths) as T;
    return obj;
  },
  put: <T>(
    path: string,
    options?: { params?: Record<string, string>; body: T },
  ) => {
    const root = JSON.parse(localStorage.getItem("__root") ?? "{}") as Record<
      string,
      unknown
    >;
    const paths = path.split("/").filter((p) => p);
    const obj = setNested(root, paths, options?.body);
    setRoot(obj);
    return getNested(root, paths) as T;
  },
  post: <T>(
    path: string,
    options?: { params?: Record<string, string>; body: T },
  ) => {
    const root = JSON.parse(localStorage.getItem("__root") ?? "{}") as Record<
      string,
      unknown
    >;
    const paths = path.split("/").filter((p) => p);
    const obj = setNested(root, paths, options?.body);
    setRoot(obj);
    return getNested(root, paths) as T;
  },
  delete: (path: string, options?: { params?: Record<string, string> }) => {
    const root = JSON.parse(localStorage.getItem("__root") ?? "{}") as Record<
      string,
      unknown
    >;
    const paths = path.split("/").filter((p) => p);
    const obj = setNested(root, paths, undefined);
    setRoot(obj);
  },
};

function setRoot(obj: unknown) {
  localStorage.setItem("__root", JSON.stringify(obj));
}

function getNested(
  node: Record<string, unknown>,
  paths: string[],
): Record<string, unknown> {
  if (!paths.length) return node;
  const nextNode = node[paths[0]] as Record<string, unknown>;
  return getNested(nextNode, paths.slice(1));
}

function setNested(
  node: Record<string, unknown>,
  paths: string[],
  object: unknown,
): Record<string, unknown> {
  const nextPath = paths[0];
  if (paths.length === 1) {
    return { [nextPath]: object };
  }
  const nodeAtNextPath = node[nextPath] as Record<string, unknown>;
  return {
    ...node,
    [nextPath]: {
      ...nodeAtNextPath,
      ...setNested(nodeAtNextPath, paths.slice(1), object),
    },
  };
}

function appendNested(
  node: Record<string, unknown>,
  paths: string[],
  object: unknown,
): Record<string, unknown> {
  const nextPath = paths[0];
  if (paths.length === 1) {
    return { [nextPath]: [...(node[nextPath] as unknown[]), object] };
  }
  const nodeAtNextPath = node[nextPath] as Record<string, unknown>;
  return {
    ...node,
    [nextPath]: {
      ...nodeAtNextPath,
      ...setNested(nodeAtNextPath, paths.slice(1), object),
    },
  };
}

// function setNested(node,paths,object) {
//   if (paths.length === 1) {
//     return { [paths[0]]: object };
//   }
//   const nextPath = paths[0];
//   const nodeAtNextPath = node[nextPath];
//   return {
//     ...node,
//     [nextPath]: {
//       ...nodeAtNextPath,
//       ...setNested(nodeAtNextPath, paths.slice(1), object),
//     },
//   };
// }
