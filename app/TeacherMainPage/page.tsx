"use client";

const Page = () => {
  return (
    <div className="flex">
      <div className="flex flex-col gap-5 m-3">
        <div className="flex gap-5">
          <div className="border rounded-[15px] w-[300px] flex flex-col">
            <div>Active Students</div>
            <div>42</div>
            <div>+3 this week</div>
          </div>
          <div className="border rounded-[15px] w-[300px]">
            <div>Avg. Weekly Workouts</div>
            <div>4.3</div>
            <div>per student</div>
          </div>
          <div className="border rounded-[15px] w-[300px]">
            <div>Avg. Progress</div>
            <div>+6%</div>
            <div>since last month</div>
          </div>
          <div className="border rounded-[15px] w-[300px]">
            <div>Pending Reviews</div>
            <div>5</div>
            <div>forms to grade</div>
          </div>
        </div>
        <div className="border rounded-[15px] w-[1260px] h-[450px] flex">
          Team Progress
        </div>
        <div className="border rounded-[15px] w-[1260px] h-[300px]">
          Upcoming Sessions
        </div>
      </div>
      <div>
        <div className="border rounded-[15px] w-[500px] h-[400px] m-3">
          <div className="m-2">Students</div>
        </div>
        <div className="border rounded-[15px] w-[500px] h-[300px] m-3">
          <div className="m-2">Recent Activities</div>
        </div>
      </div>
    </div>
  );
};
export default Page;
