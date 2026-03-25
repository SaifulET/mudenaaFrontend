import { Suspense } from "react";

import { MatchQuestion } from "../../../_components/match-question";
import { MatchLoading } from "../../../_components/match-ui";

export default function MatchQuestionPage() {
  return (
    <Suspense fallback={<MatchLoading message="Loading the question..." />}>
      <MatchQuestion />
    </Suspense>
  );
}
