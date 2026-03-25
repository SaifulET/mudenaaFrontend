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
      gameName={params.gameName ?? "Sureli Match"}
      teamA={params.teamA ?? "Hasan"}
      teamB={params.teamB ?? "Mahmmud"}
      categories={
        params.categories
          ? params.categories
              .split(",")
              .map((category) => category.trim())
              .filter(Boolean)
          : []
      }
    />
  );
}
