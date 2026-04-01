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
  const membersA = Number.parseInt(params.membersA ?? "2", 10);
  const membersB = Number.parseInt(params.membersB ?? "2", 10);

  return (
    <GameSettingsStep
      gameName={params.gameName ?? ""}
      teamA={params.teamA ?? "Hasan"}
      teamB={params.teamB ?? "Mahmmud"}
      membersA={Number.isNaN(membersA) ? 2 : membersA}
      membersB={Number.isNaN(membersB) ? 2 : membersB}
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
