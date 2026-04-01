import { notFound } from "next/navigation";

import { StartGameMatchSetup } from "../../_components/start-game-match-setup";
import { getLibraryGameById } from "../../_components/start-game-library";

export default async function StartGameMatchSetupPage(
  props: PageProps<"/start-game/[gameId]">,
) {
  const { gameId } = await props.params;
  const game = getLibraryGameById(gameId);

  if (!game) {
    notFound();
  }

  return <StartGameMatchSetup game={game} />;
}
