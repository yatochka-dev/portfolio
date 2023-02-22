import type {NextApiRequest, NextApiResponse} from "next";
import {env} from "../../env.mjs";
import sgMail from "@sendgrid/mail";
import type {WebhookRequestBody} from "../../types";
import pb from "../../lib/pocketbase";
import type {Record} from "pocketbase";

sgMail.setApiKey(env.SENDGRID_API_KEY)

const myID = "686207718822117463";

export interface ContactForm {
    firstName: string;
    lastName: string;
    workEmail: string;
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "POST") {
        res.status(405).json({message: "Method not allowed"});
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-assignment
    const body = JSON.parse(req.body) as ContactForm;

    if (!body.firstName || !body.lastName || !body.workEmail || !body.message) {
        res.status(400).json({message: "Bad request"});
        return;
    }


    await pb.admins.authWithPassword(
        env.ADMIN_EMAIL,
        env.ADMIN_PASSWORD
    )

    const contactRequest = await pb.collection("contact_requests").create<ContactForm & Record>(
        {
            firstName: body.firstName,
            lastName: body.lastName,
            workEmail: body.workEmail,
            message: body.message,
        },
    )


    const webhookPayload: WebhookRequestBody = {
        username: "Contact Form",
        avatar_url: undefined,
        content: `<@!${myID}>\n\n\n**${body.firstName} ${body.lastName}** (${body.workEmail})`,
        embeds: [
            {
                title: `Request: \`ID(${contactRequest.id})\``,
                description: body.message,
                color: 16777215,
                timestamp: contactRequest.created,
            }
        ],
        allowed_mentions: {
            parse: ["everyone"],
            users: [myID]
        },

    };


    const resp = await fetch(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        env.WEBHOOK_URL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(webhookPayload)
        }
    )

    console.log("Sent webhook")
    console.log(
        await resp.text()
    )

    if (resp.status !== 204) {
        res.status(500).json({message: "Internal server error"});
        return;
    }

    res.status(200).json({message: "OK"})

}
