import Header from "./_components/Header";
import ChallengeList from "./_components/ChallengeList";
import { Footer } from "./_components/Footer";

const data = [
  {
    id: "lr3istxnNkfee22Tark5T",
    title: "Push-up Challenge",
    description: "Do 50 push-ups every day for a week",
    target: "Strength",
    rate: 5,
    status: "PENDING",
    createdAt: "2025-11-25T14:38:19.362Z",
  },
  {
    id: "Unq703CeMSOzTGNuYqJ7l",
    title: "Push-up Challenge",
    description: "Do 50 push-ups every day for a week",
    target: "Strength",
    rate: 2,
    status: "PENDING",
    createdAt: "2025-11-26T06:19:38.905Z",
  },
  {
    id: "M1UvA1pDru-fRvMKky9xF",
    title: "Push-up Challenge",
    description: "Do 50 push-ups every day for a week",
    target: "Strength",
    rate: 2,
    status: "PENDING",
    createdAt: "2025-11-26T06:19:39.024Z",
  },
  {
    id: "L0J19QVLt99FnjOCdJijn",
    title: "hi",
    description: "hi",
    target: "hi",
    rate: 1,
    status: "PENDING",
    createdAt: "2025-11-26T06:31:15.049Z",
  },
  {
    id: "A7MzMaE1R0PAB7LOACwZ5",
    title: "asdas",
    description: "asdas",
    target: "asdasd",
    rate: 2,
    status: "PENDING",
    createdAt: "2025-11-26T08:09:04.535Z",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen px-6 py-8 bg-gradient-to-b from-green-100 via-green-50 to-white relative overflow-hidden">
      <div>
        <div className="absolute inset-0 opacity-10 bg-green-200 rounded-full">
          {" "}
        </div>

        <div className="relative max-w-3xl mx-auto space-y-6">
          <Header />
          <ChallengeList data={data} />
        </div>
        <Footer />
      </div>
    </main>
  );
}
