import { GameSettingsStep } from "../../_components/game-settings-step";

type SearchParams = Promise<{
  gameName?: string;
  teamA?: string;
  teamB?: string;
  membersA?: string;
  membersB?: string;
  categories?: string;
}>;

export default async function StartGameSettingsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  return (
    <GameSettingsStep
      teamA={params.teamA ?? "Hasan"}
      teamB={params.teamB ?? "Mahmmud"}
    />
  );
}
