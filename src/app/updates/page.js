// app/updates/page.js
// Outer: async Server Component — fetches data from Sanity
// Inner: Client Component — handles GSAP animations

import UpdatesClient from "./UpdatesClient";
import { client } from "@/sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(client);
function urlFor(source) {
    return builder.image(source);
}

const UPDATES_QUERY = `*[_type == "update" && defined(publishedAt)]
  | order(publishedAt desc)[0...10]{
    _id,
    title,
    publishedAt,
    image,
    body
  }`;

const options = { next: { revalidate: 60 } };

export const metadata = {
    title: "Updates | Technology Robotix Society",
    description: "Stay up to date with research breakthroughs, event announcements, and milestones from TRS at IIT Kharagpur.",
};

export default async function UpdatesPage() {
    const raw = await client.fetch(UPDATES_QUERY, {}, options);

    const updates = (raw || []).map((u) => ({
        ...u,
        imageUrl: u.image ? urlFor(u.image).width(900).url() : null,
    }));

    return <UpdatesClient updates={updates} />;
}
