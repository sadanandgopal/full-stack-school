import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
// import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalendar";
import { getAuth } from "@/utils/auth";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

const StudentPage = async () => {
  const cookieStore = cookies(); // Access cookies from next/headers
  const { userId } = getAuth(cookieStore); // Pass cookies to getAuth

  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! || "student1" } },
    },
  });

  console.log(classItem);
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalendarContainer type="classId" id={classItem[0].id} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
