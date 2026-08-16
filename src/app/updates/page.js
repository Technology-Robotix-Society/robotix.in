import UpdatesClient from "./UpdatesClient";
import { client } from "@/sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { curatedUpdates } from "@/data/updates";

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
    title: "Technology Robotix Society",
    description: "Live dispatches, research breakthroughs, upcoming competitions, event timelines, and milestones from Technology Robotix Society at IIT Kharagpur.",
};

export default async function UpdatesPage() {
    let sanityUpdates = [];
    try {
        const raw = await client.fetch(UPDATES_QUERY, {}, options);
        sanityUpdates = (raw || []).map((u) => ({
            ...u,
            imageUrl: u.image ? urlFor(u.image).width(900).url() : null,
            category: "Selections",
            readTime: "2 min read",
            author: "Technology Robotix Society",
            tags: ["TRSSelections", "Induction", "IITKGP", "Robotics"],
            isLiveSanity: true,
        }));
    } catch {
        sanityUpdates = [];
    }

    // Merge live updates with curated dataset (Sanity updates first, avoiding duplicate titles)
    const existingTitles = new Set(sanityUpdates.map((u) => (u.title || "").toLowerCase().trim()));
    const mergedUpdates = [
        ...sanityUpdates,
        ...curatedUpdates.filter((u) => !existingTitles.has((u.title || "").toLowerCase().trim())),
    ];

    return <UpdatesClient initialUpdates={mergedUpdates} />;
}

