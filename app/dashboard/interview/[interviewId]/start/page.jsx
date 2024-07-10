
// "use client";
// import React, { useEffect, useState } from "react";
// import { db } from "@/utils/db";
// import { eq } from "drizzle-orm";
// import { MockInterview } from "@/utils/schema";
// import QuetionSections from "./_components/QuetionSections";

// function StartInterview({ params }) {
//   const [interviewData, setInterviewData] = useState(null);
//   const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);

//   useEffect(() => {
//     if (params.interviewId) {
//       GetInterviewDetails();
//     }
//   }, [params.interviewId]);

//   const GetInterviewDetails = async () => {
//     try {
//       const result = await db
//         .select()
//         .from(MockInterview)
//         .where(eq(MockInterview.mockId, params.interviewId));

//       if (result.length > 0) {
//         console.log(result);
//         const jsonMockResp = JSON.parse(result[0].jsonMockResp);
//         console.log(jsonMockResp);
//         setMockInterviewQuestion(jsonMockResp);
//         console.log("Mock:")
//         console.log(mockInterviewQuestion);
//         setInterviewData(result[0]);
//       } else {
//         console.log("No data found");
//       }
//     } catch (error) {
//       console.error("Error fetching interview details:", error);
//     }
//   };
//   return <div>
//     <div className="grid grid-cols-1 md:grid-cols-2">
//     {/* Quetions */}
//     <QuetionSections jsonMockResp={mockInterviewQuestion}/>


//     {/*Vedio/Audio Recoding  */}

//     </div>
//   </div>;
// }

// export default StartInterview;


"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "@/utils/schema";
import QuetionSections from "./_components/QuetionSections";
import RecordAnsSection from "./_components/RecordAnsSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const[activeQuetionIndex,setActiveQuetionIndex]=useState(0);

  useEffect(() => {
    if (params.interviewId) {
      GetInterviewDetails();
    }
  }, [params.interviewId]);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
        // Logging the result instead of state
        console.log("Mock questions:", jsonMockResp);
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuetionSections mockInterviewQuestion={mockInterviewQuestion} 
            activeQuetionIndex={activeQuetionIndex}
        />
        
        {/* Video/Audio Recording */}
        <RecordAnsSection
          mockInterviewQuestion={mockInterviewQuestion} 
            activeQuetionIndex={activeQuetionIndex}
            interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
       {activeQuetionIndex>0&& 
       <Button onClick={()=>setActiveQuetionIndex(activeQuetionIndex-1)}>Previous Question</Button>}
        {activeQuetionIndex!=mockInterviewQuestion?.length-1&&
        <Button onClick={()=>setActiveQuetionIndex(activeQuetionIndex+1)}>Next Question</Button>}
        {activeQuetionIndex==mockInterviewQuestion?.length-1&&
        <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
        <Button>End Interview</Button>
        </Link>
        }
      </div>
    </div>
  );
}

export default StartInterview;
