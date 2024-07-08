// "use client";
// import { MockInterview } from "@/utils/schema";
// import { Button } from "@/components/ui/button";
// import React, { useEffect, useState } from "react";
// import { db } from "@/utils/db";
// import { eq } from "drizzle-orm";
// import Webcam from "react-webcam";
// import { Lightbulb, WebcamIcon } from "lucide-react";
// function Interview({ params }) {
//   const [interviewData, setInterviewData] = useState();
//   const [WebCamEnabled, setWebCamEnabled] = useState(false);
//   useEffect(() => {
//     console.log(params.interviewId);
//     GetInterviewDetails();
//   }, []);

//   //   used to get interview details by mock id
//   const GetInterviewDetails = async () => {
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(eq(MockInterview.mockId, params.interviewId));

//     console.log(result);
//     setInterviewData(result[0]);
//   };
//   return (
//     <div className="my-10 flex justify-center flex-col items-center">
//       <h2 className="font-bold text-2xl">Let's Get Started</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         <div className="flex flex-col my-5 gap-5 ">
//           <div className="flex flex-col p-5 rounded-lg border gap-5">
//             <h2 className="text-lg"
//               ><strong>Job Role/Job Position:</strong>
//               {interviewData.jobPosition}
//             </h2>
//             <h2 className="text-lg">
//               {" "}
//               <strong>Job Description/Tech Stack :</strong>
//               {interviewData.jobDesc}
//             </h2>
//             <h2 className="text-lg">
//               {" "}
//               <strong>Years Of Experience:</strong>
//               {interviewData.jobExperience}
//             </h2>
//           </div>

//           <div>
//             <h2>
//               <Lightbulb />
//               <strong>Information</strong>
//             </h2>
//             <h2>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
//           </div>
//         </div>

//         <div>
//           {WebCamEnabled ? (
//             <Webcam
//               onUserMedia={() => setWebCamEnabled(true)}
//               onUserMediaError={() => setWebCamEnabled(false)}
//               mirrored={true}
//               style={{ height: 300, width: 300 }}
//             />
//           ) : (
//             <>
//               <WebcamIcon className="h-72 w-full my-7 p-20 bg- rounded-lg border" />
//               <Button onClick={() => setWebCamEnabled(true)}>
//                 Enable Web Cam and Microphone
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Interview;
"use client";
import { MockInterview } from "@/utils/schema";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, [params.interviewId]);

  const GetInterviewDetails = async () => {
    // try {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    console.log(result);
    // if (result.length > 0) {
    setInterviewData(result[0]);
    //   }
    // } catch (error) {
    //   console.error("Error fetching interview details:", error);
    // }
  };

  return (
    <div className="my-10 ">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years Of Experience:</strong>
              {interviewData?.jobExperience}
            </h2>
          </div>

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gep-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>

        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 rounded-lg border" />
              <Button
                Varient="ghost"
                className="w-full bg-white text-black hover:bg-gray-100"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
