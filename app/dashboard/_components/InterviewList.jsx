// "use client";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { useUser } from "@clerk/nextjs";
// import React, { useEffect, useState } from "react";
// import { eq } from "drizzle-orm";
// import { desc } from 'drizzle-orm/sql';

// function InterviewList() {
//   const { user } = useUser();
//   const [interviewList, setInterviewList] = useState([]);
//   useEffect(() => {
//     user&&GetInterviewList();
//   }, [user]);

//   const GetInterviewList = async () => {
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(
//         eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
//       )
//       .orderBy(desc(MockInterview.id));

//     console.log(result);
//     setInterviewList(result);
//   };
//   return (
//     <div>
//       <h2 className="font-medium text-xl">Previous Mock interview</h2>
//     </div>
//   );
// }

// export default InterviewList;

"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { desc } from 'drizzle-orm/sql';
import InterviewItemCard from "./InterviewItemCard";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    
      user&&GetInterviewList();
    
  }, [user]);

  const GetInterviewList = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(MockInterview.id));

      console.log(result); // This should log the result to the console
      setInterviewList(result);
    } catch (error) {
      console.error("Error fetching interview list:", error);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList&&interviewList.map((interview,index)=>(
            <InterviewItemCard 
            interview={interview}
            key={index}/>
        ))}
      </div>
    </div>
  );
}

export default InterviewList;

