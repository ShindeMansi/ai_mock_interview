// import { varchar,serial,text } from "drizzle-orm/mysql-core";
// import { pgTable } from "drizzle-orm/pg-core";

// export const MockInterview=pgTable('mockInterview',{
//     id:serial('id').primaryKey(),
//     jsonMockResp:text('jsonMockResp').notNull(),
//     jobPosition:varchar('jobPosition').notNull(),
//     jobDesc:varchar('jobDesc').notNull(),
//     jobExperience:varchar('jobExperience').notNull(),
//     createdBy:varchar('createdBy').notNull(),
//     createdAt:varchar('createdAt'),
//     mockId:varchar('mockId').notNull()
// })

import { text, varchar, serial } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition', 255).notNull(), // Added length argument
    jobDesc: varchar('jobDesc', 255).notNull(), // Added length argument
    jobExperience: varchar('jobExperience', 255).notNull(), // Added length argument
    createdBy: varchar('createdBy', 255).notNull(), // Added length argument
    createdAt: varchar('createdAt', 255), // Added length argument
    mockId: varchar('mockId', 255).notNull() // Added length argument
});
