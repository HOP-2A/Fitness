interface Challenge {
  id: string;
  title: string;
  description?: string | null;
  target?: string | null;
  rate: number;
  status: string;
  createdAt: string | Date;
}

interface ChallengeCardProps {
  item: Challenge;
}

export default function ChallengeCard({ item }: ChallengeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
        <span className="bg-green-200 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
          {item.status}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{item.description}</p>

      <div className="flex justify-between items-center text-sm text-gray-700 font-semibold">
        <div>
          🎯 Target: <span className="text-green-600">{item.target}</span>
        </div>
        <div>
          ⭐ Rate: <span className="text-yellow-500">{item.rate}</span>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-400">
        Created: {new Date(item.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}
