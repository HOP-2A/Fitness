import ChallengeCard from "./ChallengeCard";

interface Challenge {
  id: string;
  title: string;
  description?: string | null;
  target?: string | null;
  rate: number;
  status: string;
  createdAt: string | Date;
}

interface ChallengeListProps {
  data: Challenge[];
}

export default function ChallengeList({ data }: ChallengeListProps) {
  return (
    <div className="space-y-5">
      {data.map((challenge) => (
        <ChallengeCard key={challenge.id} item={challenge} />
      ))}
    </div>
  );
}
