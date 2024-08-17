import { Resend } from "resend";

export const POST = async (request: Request) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const json = await request.json();
    const res = await resend.emails.send({
        from: "Guider Requests <shreyans+guider@shreyans.sh>",
        to: ["shreyans+guider@shreyans.sh"],
        subject: json.title || "New Guide Request",
        text: JSON.stringify(json, undefined, 2),
    });

    return new Response();
};
