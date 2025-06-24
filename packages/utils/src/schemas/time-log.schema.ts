import * as z from "zod/v4";

export const timeLogSchema = z.object({
	id: z.string(),
	clockIn: z.date().nullable(),
	clockOut: z.date().nullable(),
	duration: z.iso.duration(),
});

export type TimeLog = z.infer<typeof timeLogSchema>;
