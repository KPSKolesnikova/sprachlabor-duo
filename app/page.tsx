import { getChatGPTUser } from "./chatgpt-auth";
import Studio from "./studio";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getChatGPTUser();
  return <Studio account={user ? { id: user.userId, name: user.fullName || "Участница" } : null} />;
}
