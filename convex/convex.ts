import { ConvexReactClient } from "convex/react";

// Create a client with the Convex URL from the environment
export const convex = new ConvexReactClient(process.env.CONVEX_URL || "https://polished-bullfrog-577.convex.cloud"); 