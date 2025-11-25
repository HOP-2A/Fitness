import ChallengeCard from "./ChallengeCard";

export default function ChallengeList({ data }) {
  return (
    <div className="space-y-5">
      {data.map((challenge) => (
        <ChallengeCard key={challenge.id} item={challenge} />
      ))}
    </div>
  );
}
