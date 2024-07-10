// "use client";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { chatSession } from "@/utils/GeminiAIModal";
// import { LoaderCircle } from "lucide-react";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { v4 as uuidv4 } from "uuid";
// import { useUser } from "@clerk/nextjs";
// import moment from "moment/moment";
// import { useRouter } from "next/navigation";

// function AddNewInterview() {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [jobPosition, setJobPosition] = useState();
//   const [jobDesc, setJobDesc] = useState();
//   const [jobExperience, setJobExperience] = useState();
//   const [loading, setLoading] = useState(false);
//   const [jsonResponse, setJsonResponse] = useState([]);
//   const router=useRouter();
//   const { user } = useUser();

//   const onSubmit = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     console.log(jobPosition, jobDesc, jobExperience);

//     const InputPromt =
//       "Job Position:" +
//       jobPosition +
//       ",Job Description:" +
//       jobDesc +
//       ",Years Of Experience:" +
//       jobExperience +
//       ",Depends on this information please give me " +
//       process.env.NEXT_PUBLIC_INTERVIEW_QUETION_COUNT +
//       "  interview quetion with Answered in JSON Format,Give Quetion and Answered as field in JSON";
//     const result = await chatSession.sendMessage(InputPromt);
//     const MockJsonResp = result.response
//       .text()
//       .replace("```json","")
//       .replace("```","");
//     console.log(JSON.parse(MockJsonResp));

//     if (MockJsonResp) {
//       const resp = await db.insert(MockInterview)
//         .values({
//           mockId: uuidv4(),
//           jsonMockResp: MockJsonResp,
//           jobPosition: jobPosition,
//           jobDesc: jobDesc,
//           jobExperience: jobExperience,
//           createdBy: user?.primaryEmailAddress?.emailAddress,
//           createdAt: moment().format("DD-MM-YYYY"),
//         })
//         .returning({ mockId: MockInterview.mockId });
//         setJsonResponse(MockJsonResp)
//       console.log("Inserted ID:", resp);
//       if(resp)
//       {
//         setOpenDialog(false);
//         router.push('/dashboard/interview/'+resp[0].mockId)
//       }
//     } else {
//       console.log("ERROR");
//     }
//     setLoading(false);
//   };
//   return (
//     <div>
//       <div
//         className="p-10 border rounded-lg bg-secondary hover:scale-105
//        hover:shadow-md cursor-pointer transition-all "
//         onClick={() => setOpenDialog(true)}
//       >
//         <h2 className="font-bold text-lg">+Add New</h2>
//       </div>
//       <Dialog open={openDialog}>
//         <DialogContent className="max-w-2xl ">
//           <DialogHeader>
//             <DialogTitle className=" text-2xl">
//               Tell us more about your Job Interview
//             </DialogTitle>
//             <DialogDescription>
//               <form onSubmit={onSubmit}>
//                 <div>
//                   <h2>
//                     Add Details about your job position/role,Job Description and
//                     Years of Experience
//                   </h2>
//                   <div className="mt-7 my-3">
//                     <label>Job Role/Job Position</label>
//                     <Input
//                       placeholder="Ex. Full Stack Developer"
//                       required
//                       onChange={(event) => setJobPosition(event.target.value)}
//                     />
//                   </div>

//                   <div className="my-3">
//                     <label>Job Description/Tech Stack</label>
//                     <Textarea
//                       placeholder="Ex. ReactJS,NodeJs ,MySql"
//                       required
//                       onChange={(event) => setJobDesc(event.target.value)}
//                     />
//                   </div>
//                   <div className="my-3">
//                     <label>Years Of Experience</label>
//                     <Input
//                       placeholder="Ex. 5"
//                       required
//                       onChange={(event) => setJobExperience(event.target.value)}
//                     />
//                   </div>
//                 </div>
//                 <div className="flex gap-5 justify-end">
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     onClick={() => setOpenDialog(false)}
//                   >
//                     Cancel
//                   </Button>
//                   <Button type="submit" disabled={loading}>
//                     {loading ? (
//                       <>
//                         <LoaderCircle className="animate-spin" />
//                         'Generating from AI'
//                       </>
//                     ) : (
//                       "Start Interview"
//                     )}
//                   </Button>
//                 </div>
//               </form>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default AddNewInterview;



"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  // const onSubmit = async (e) => {
  //   setLoading(true);
  //   e.preventDefault();
  //   console.log(jobPosition, jobDesc, jobExperience);

  //   const InputPromt =
  //     "Job Position:" +
  //     jobPosition +
  //     ",Job Description:" +
  //     jobDesc +
  //     ",Years Of Experience:" +
  //     jobExperience +
  //     ",Depends on this information please give me " +
  //     process.env.NEXT_PUBLIC_INTERVIEW_QUETION_COUNT +
  //     " interview quetion with Answered in JSON Format,Give Quetion and Answered as field in JSON";
    
  //   try {
  //     const result = await chatSession.sendMessage(InputPromt);
  //     let MockJsonResp = await result.response.text();
      
  //     // Clean the response string
  //     MockJsonResp = MockJsonResp.replace(/```json/g, "").replace(/```/g, "").trim();
      
  //     const parsedResponse = JSON.parse(MockJsonResp);
  //     console.log(parsedResponse);

  //     if (parsedResponse) {
  //       const resp = await db.insert(MockInterview)
  //         .values({
  //           mockId: uuidv4(),
  //           jsonMockResp: MockJsonResp,
  //           jobPosition: jobPosition,
  //           jobDesc: jobDesc,
  //           jobExperience: jobExperience,
  //           createdBy: user?.primaryEmailAddress?.emailAddress,
  //           createdAt: moment().format("DD-MM-YYYY"),
  //         })
  //         .returning({ mockId: MockInterview.mockId });

  //       setJsonResponse(MockJsonResp);
  //       console.log("Inserted ID:", resp);
        
  //       if (resp) {
  //         setOpenDialog(false);
  //         router.push('/dashboard/interview/' + resp[0].mockId);
  //       }
  //     } else {
  //       console.log("ERROR");
  //     }
  //   } catch (error) {
  //     console.error("Failed to parse response or insert into DB:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);
  
    const InputPromt =
      "Job Position:" +
      jobPosition +
      ",Job Description:" +
      jobDesc +
      ",Years Of Experience:" +
      jobExperience +
      ",Depends on this information please give me " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUETION_COUNT +
      " interview quetion with Answered in JSON Format,Give Quetion and Answered as field in JSON";
    
    try {
      const result = await chatSession.sendMessage(InputPromt);
     // let MockJsonResp = await result.response.text();
      
      // Clean the response string
      // MockJsonResp = MockJsonResp.replace(/```json/g, "").replace(/```/g, "").trim();
      const MockJsonResp = result.response
     .text()
      .replace("```json","")
      .replace("```","");
      
      console.log("Raw JSON response:", MockJsonResp); // Log the response for debugging
  
      try {
        const parsedResponse = JSON.parse(MockJsonResp);
        console.log("Parsed JSON response:", parsedResponse);
  
        const resp = await db.insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-YYYY"),
          })
          .returning({ mockId: MockInterview.mockId });
  
        setJsonResponse(MockJsonResp);
        console.log("Inserted ID:", resp);
        
        if (resp) {
          setOpenDialog(false);
          router.push('/dashboard/interview/' + resp[0].mockId);
        }
      } catch (error) {
        console.error("Failed to parse JSON response:", error);
        console.log("JSON string causing the error:", MockJsonResp);
        // Handle the error appropriately
      }
    } catch (error) {
      console.error("Failed to send message or retrieve response:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105
       hover:shadow-md cursor-pointer transition-all "
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg">+Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl ">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your Job Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your job position/role, Job Description and
                    Years of Experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/Tech Stack</label>
                    <Textarea
                      placeholder="Ex. ReactJS,NodeJs, MySql"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years Of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        'Generating from AI'
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;

